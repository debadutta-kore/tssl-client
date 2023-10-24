import { Field } from "formik";
import { useId } from "react";
import style from "./index.module.sass";
function InputField(props) {
  const id = useId();
  return (
    <Field name={props.name}>
      {({ field, meta }) => {
        return (
          <div className={style["field"]}>
            <label htmlFor={id}>{props.label}</label>
            <input
              className={
                meta.touched && meta.error
                  ? style["error-input"]
                  : ""
              }
              type={props.type}
              placeholder={props.placeholder}
              required={props.required}
              {...field}
              id={id}
            />
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
