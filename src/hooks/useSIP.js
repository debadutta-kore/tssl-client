import * as JsSIP from "jssip";
import { useEffect } from "react";
import { useState } from "react";
import ringingSound from "../assets/audio/ringing.mp3";
import hangupSound from "../assets/audio/hangup.mp3";
import silenceSound from '../assets/audio/silence.mp3';
// JsSIP.debug.enable("JsSIP:*");
const createRandomToken = (length = 12) => {
  let token = "";
  for (let i = 0; i < length; i++) {
    token += Math.floor(36 * Math.random()).toString(36);
  }
  return token;
};
const getConfig = (config) => {
  return {
    uri: `sip:${config.from}@audiocodes-sbc-prod.kore.ai`,
    password: config.from,
    authorization_user: config.from,
    connection_recovery_max_interval: 30,
    connection_recovery_min_interval: 2,
    contact_uri: `sip:${
      config.from
    }@${createRandomToken()}.invalid;transport=ws`,
    display_name: config.from,
    register: true,
    register_expires: 600,
    session_timers: false,
  };
};
const hangupAudio = new Audio(hangupSound),
      ringingAudio = new Audio(ringingSound),
      remoteAudio = document.createElement('audio');
remoteAudio.controls = true;
remoteAudio.src = silenceSound;
remoteAudio.style.display = 'none';
// add some delay to ringing sound
ringingAudio.addEventListener("ended", () => {
  setTimeout(() => {
    ringingAudio.currentTime = 0;
    if (!ringingAudio.paused) {
      ringingAudio.play();
    }
  }, 1000);
});
function useSIP(config) {
  const [callState, setCallState] = useState("calling");
  const [restatePhone, setRestartPhone] = useState(0);
  const [phone, setPhone] = useState(null);
  const [session, setSession] = useState(null);
  const [sound, setSound] = useState(true);
  const [mute, setMute] = useState(false);
  //create phone side effect
  useEffect(() => {
    const socket = new JsSIP.WebSocketInterface(
      import.meta.env.VITE_SIP_SEVER_URL
    );
    const phone = new JsSIP.UA({ sockets: [socket], ...getConfig(config) });
    setPhone(phone);
    phone.on("newRTCSession", (data) => {
      const session = data.session;
      setSession(data.session);
      session.on("confirmed", function () {
        //the call has connected, and audio is playing
        ringingAudio.pause();
        setCallState("oncall");
      });
      session.on("ended", function () {
        //the call has ended
        ringingAudio.loop = false;
        ringingAudio.pause();
        setCallState("end");
        setSession(null);
        hangupAudio.play();
        setTimeout(() => {
          setCallState("calling");
        }, 500);
      });
      session.on("failed", function () {
        // unable to establish the call
        ringingAudio.loop = false;
        ringingAudio.pause();
        setCallState("end");
        setSession(null);
        hangupAudio.play();
        setTimeout(() => {
          setCallState("calling");
        }, 500);
      });
      session.connection.addEventListener("track", (event) => {
        if (event.track.kind === "audio") {
          let stream = null;
          if (event.streams.length > 0) {
            stream = event.streams[0];
          } else {
            stream = new MediaStream([event.track]);
          }
          remoteAudio.currentTime = 0;
          if ("srcObject" in remoteAudio) {
            remoteAudio.srcObject = stream;
          } else {
            remoteAudio.src = URL.createObjectURL(stream);
          }
          remoteAudio.play();
        }
      });
    });
    phone.start();
    document.body.appendChild(remoteAudio);
    return () => {
      phone.stop();
      setPhone(null);
      document.body.removeChild(remoteAudio);
    };
  }, [config, restatePhone]);

  // side effect for sound
  useEffect(() => {
    if (sound) {
      remoteAudio.muted = false;
    } else {
      remoteAudio.muted = true;
    }
  }, [sound]);

  //side effect for mute and unmute
  useEffect(() => {
    if (session) {
      const { audio } = session.isMuted();
      if (audio && !mute) {
        session.unmute({ audio: true });
      } else if (!audio && mute) {
        session.mute({ audio: true });
      }
    }
  }, [mute, session]);

  const endCall = () => {
    if (phone) {
      setRestartPhone((restart) => restart + 1);
    }
  };

  const startCall = () => {
    if (phone) {
      ringingAudio.play();
      setCallState("calling");
      phone.call(`sip:${config.to}@audiocodes-sbc-prod.kore.ai`, {
        mediaConstraints: { audio: true, video: false },
        extraHeaders: [
          `X-CALLFLOW-ID: ${config.flowId}`,
          `X-CALLFLOW-STATE: ${config.flowState}`,
        ],
      });
      remoteAudio.play();
    }
  };
  const sendDTMF = (tone) => {
    if (session) {
      session.sendDTMF(tone, {
        transportType: "RFC2833",
      });
    }
  };
  const toggleMic = () => {
    setMute(!mute);
  };
  const toggleSound = () => {
    setSound(!sound);
  };
  return {
    endCall,
    startCall,
    callState,
    phone,
    session,
    sendDTMF,
    toggleMic,
    toggleSound,
    sound,
    mute,
  };
}

export default useSIP;
