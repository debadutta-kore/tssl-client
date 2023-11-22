import DialPadButton from "../../../components/button/dialpadButton";
import DialPad from "../../../components/dialpad";
import callIcon from "../../../assets/icons/call-icon.svg";
import dialpadIcon from "../../../assets/icons/dialpad.svg";
import hangupIcon from "../../../assets/icons/hangup.svg";
import dialDeleteIcon from "../../../assets/icons/delete-dial.svg";
import speakerOnIcon from "../../../assets/icons/speaker-on.svg";
import speakerOffIcon from "../../../assets/icons/speaker-off.svg";
import muteIcon from "../../../assets/icons/mute.svg";
import unmuteIcon from "../../../assets/icons/unmute.svg";
import style from "./index.module.sass";
import { useState } from "react";
import {
  formatIncompletePhoneNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";
import { useRef } from "react";
import useSIP from "../../../hooks/useSIP";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import useTimer from "../../../hooks/useTimer";
import { useEffect } from "react";
import { formatTime } from "../../../utilities";
const callStateToStatus = (state) => {
  if (state === "calling") {
    return "Calling...";
  } else {
    return "End";
  }
};
const formateInput = (input, ref) => {
  if (input.length <= 10) {
    ref.current.style.fontSize = "30px";
    return /[*#]/.test(input)
      ? input
      : formatIncompletePhoneNumber(input, "US");
  } else if (input.length <= 17) {
    ref.current.style.fontSize = "25px";
    return input;
  } else {
    return "..." + input.slice(input.length - 15);
  }
};
const initialInputState = () => {
  return { rawInput: "", formatedInput: "" };
};
function IVRChat() {
  const { usecaseInfo } = useOutletContext();
  const [step, setStep] = useState(1);
  const [input, setInput] = useState(initialInputState);
  const {timer, startTimer, stopTimer} = useTimer();
  const inputRef = useRef();
  const sip = useSIP(usecaseInfo.config);

  // side effect for start timer and stop timer when call state change
  useEffect(()=>{
    if(sip.callState === 'oncall') {
      startTimer();
    }else {
      stopTimer();
    }
  },[sip.callState, startTimer, stopTimer])

  // side effect for when call is end then back to setp-1
  useEffect(()=>{
    if(sip.callState === 'end') {
      setStep(1);
    }
  },[sip.callState]);

  const onDeleteNumber = () => {
    setInput((prevInputValue) => ({
      rawInput: prevInputValue.rawInput.slice(0, -1),
      formatedInput: formateInput(
        prevInputValue.rawInput.slice(0, -1),
        inputRef
      ),
    }));
  };
  const onEnterNumber = (key) => {
    setInput((prevInputValue) => ({
      rawInput: prevInputValue.rawInput + key,
      formatedInput: formateInput(prevInputValue.rawInput + key, inputRef),
    }));
  };
  const onSumitHandler = (event) => {
    event.preventDefault();
    if (isValidPhoneNumber(inputRef.current.value, "US")) {
      if (input.rawInput === usecaseInfo.config.contact) {
        sip.startCall();
        setInput(initialInputState);
        setStep(2);
      } else {
        toast("You entered a wrong phone number", { type: "error" });
      }
    } else {
      toast("You entered a Invalid phone number", { type: "error" });
    }
  };
  const onEnterDTMF = (key) => {
    sip.sendDTMF(key);
    setInput((prevInputValue) => {
      let input = prevInputValue.rawInput + key;
      if (inputRef && inputRef.current) {
        if (input.length <= 10) {
          inputRef.current.style = "30px";
        } else if (input.length <= 17) {
          inputRef.current.style.fontSize = "25px";
        } else {
          input = "..." + input.slice(input.length - 15);
        }
      }
      return {
        rawInput: input,
        formatedInput: input,
      };
    });
  };
  const onEndCall = () => {
    setInput(initialInputState);
    sip.endCall();
    setStep(1);
  };

  return (
    <div className={style["dialer"]}>
      {step === 1 && (
        <form className={style["dial-screen"]} onSubmit={onSumitHandler}>
          <input
            type="text"
            className={style["dial-number"]}
            name="phone"
            value={input.formatedInput}
            ref={inputRef}
            readOnly
          />
          <div className={style["dialpad-container"]}>
            <DialPad onKeyPress={onEnterNumber} />
            <div className={style["dial-btn-container"]}>
              <DialPadButton style={{ background: "#34C759" }} type="submit" disabled={input.rawInput===''}>
                <img src={callIcon} alt="call-icon" width="20" height="20" />
              </DialPadButton>
              <button
                type="button"
                className={style["delete-dialed-btn"]}
                onClick={onDeleteNumber}
              >
                <img
                  src={dialDeleteIcon}
                  alt="delete-number"
                  width="20"
                  height="20"
                />
              </button>
            </div>
          </div>
        </form>
      )}
      {step === 2 && (
        <div className={style["call-screen"]}>
          <div className={style["call-screen-status"]}>
            {sip.callState === "oncall" ? (
              <span>{formatTime(timer)}</span>
            ) : (
              <span>{callStateToStatus(sip.callState)}</span>
            )}
            <h2>{usecaseInfo.name}</h2>
          </div>
          <div className={style["call-dialpad-btns"]}>
            <DialPadButton
              className={style["call-dialpad-button"]}
              onClick={sip.toggleSound}
              style={{ background: !sip.sound ? "#101828" : "" }}
            >
              {sip.sound ? (
                <img src={speakerOnIcon} width={20} height={20} />
              ) : (
                <img src={speakerOffIcon} width={16} height={16} />
              )}
              <span>Speaker</span>
            </DialPadButton>
            <DialPadButton
              className={style["call-dialpad-button"]}
              onClick={sip.toggleMic}
              style={{ background: sip.mute ? "#101828" : "" }}
            >
              {!sip.mute ? (
                <img src={unmuteIcon} width={20} height={20} />
              ) : (
                <img src={muteIcon} width={20} height={20} />
              )}
              <span>Mic</span>
            </DialPadButton>
            <DialPadButton
              className={style["call-dialpad-button"]}
              onClick={() => setStep(3)}
              disabled={sip.callState === 'calling'}
            >
              <img src={dialpadIcon} width={20} height={20} />
              <span>Keypad</span>
            </DialPadButton>
            <DialPadButton
              className={style["call-dialpad-button"]}
              style={{ background: "#F04438" }}
              onClick={onEndCall}
            >
              <img src={hangupIcon} width={20} height={20} />
              <span>End</span>
            </DialPadButton>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={style["dial-screen"]}>
          {input.rawInput ? (
            <input
              type="text"
              className={style["dial-number"]}
              ref={inputRef}
              value={input.rawInput}
              readOnly
            />
          ) : (
            <div className={style["call-screen-status"]}>
              <span>{formatTime(timer)}</span>
              <h2>{usecaseInfo.name}</h2>
            </div>
          )}
          <div className={style["dialpad-container"]}>
            <DialPad onKeyPress={onEnterDTMF} />
            <div className={style["dial-btn-container"]}>
              <DialPadButton
                style={{ background: "#F04438" }}
                onClick={onEndCall}
              >
                <img src={hangupIcon} alt="call-icon" width="20" height="20" />
              </DialPadButton>
              <DialPadButton
                style={{ background: "#101828" }}
                onClick={() => {
                  setStep(2);
                  setInput(initialInputState);
                }}
              >
                <img
                  src={dialpadIcon}
                  alt="dialpad-icon"
                  width="20"
                  height="20"
                />
              </DialPadButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default IVRChat;
