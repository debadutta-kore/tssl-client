import { Field } from "formik";
import React, { useId, useState } from "react";
import style from "./index.module.sass";
import errorIcon from "../../assets/icons/error-round.svg";
import closeEye from "../../assets/icons/close-eye.svg";
import openEye from "../../assets/icons/open-eye.svg";

function InputField({ component, label, ...inputProps }) {
  const id = useId();
  const [focused, setFocus] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const errorStyle = {
    borderColor: "#FDA29B",
    outlineColor: "#FDA29B",
    boxShadow: "0px 1px 2px 0px #1018280D",
  };

  return (
    <Field name={inputProps.name}>
      {({ field, meta }) => {
        return (
          <div className={style["field"]}>
            <label htmlFor={id}>{label}</label>
            <div
              className={focused? `${style['focus']} ${style["field-input"]}`: style["field-input"]}
              style={meta.touched && meta.error ? errorStyle : {}}
            >
              {component ? (
                React.createElement(component, {
                  onFocusCapture: () => setFocus(true),
                  onBlurCapture: () => setFocus(false),
                  ...field,
                  ...inputProps,
                  id,
                })
              ) : (
                <input
                  onFocusCapture={() => setFocus(true)}
                  onBlurCapture={() => setFocus(false)}
                  {...inputProps}
                  {...field}
                  id={id}
                  type={
                    inputProps.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : inputProps.type
                  }
                />
              )}
              {inputProps.type === "password" &&
                !(meta.touched && meta.error) && (
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
