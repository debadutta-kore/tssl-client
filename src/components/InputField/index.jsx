import { Field } from "formik";
import { useId, useState } from "react";
import style from "./index.module.sass";
import errorIcon from "../../assets/icons/error-round.svg";
import closeEye from "../../assets/icons/close-eye.svg";
import openEye from "../../assets/icons/open-eye.svg";

function InputField(props) {
  const id = useId();
  const [focused, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const focusedStyle = {
    border: "1px solid #84ADFF",
    boxShadow: "0px 0px 0px 4px #EFF4FF",
  };

  const errorStyle = {
    borderColor: "#FDA29B",
    outlineColor: '#FDA29B',
    boxShadow: "0px 1px 2px 0px #1018280D",
  };

  return (
    <Field name={props.name}>
      {({ field, meta }) => {
        return (
          <div className={style["field"]}>
            <label htmlFor={id}>{props.label}</label>
            <div
              className={style["field-input"]}
              style={
                focused
                  ? (meta.touched && meta.error ? errorStyle : focusedStyle)
                  : (meta.touched && meta.error ? errorStyle : {})
              }
            >
              <input
                className={
                  meta.touched && meta.error ? style["error-input"] : ""
                }
                onFocusCapture={() => setFocus(!focused)}
                onBlurCapture={() => setFocus(!focused)}
                type={
                  props.type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : props.type
                }
                placeholder={props.placeholder}
                required={props.required}
                {...field}
                id={id}
              />
              {props.type === "password" && !(meta.touched && meta.error) && (
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <img
                    src={showPassword ? openEye : closeEye}
                    alt="change-password-mode"
                    width={20}
                    height={20}
                  />
                </button>
              )}
              {meta.touched && meta.error && (
                <img src={errorIcon} alt="error-icon" width={16} height={16} />
              )}
            </div>
            {meta.touched && meta.error && (
              <span className={style["error"]}>{meta.error}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
}

export default InputField;
