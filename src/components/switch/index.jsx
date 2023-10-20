import style from "./index.module.sass";
import { forwardRef } from "react";
const Switch = forwardRef(function Switch(props,ref){
    return <label className={style["switch"]}>
      <input type="checkbox" ref={ref} {...props}/>
      <span className={style["slider"]}></span>
    </label>
  });
export default Switch;
