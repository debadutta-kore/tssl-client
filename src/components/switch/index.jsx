import { forwardRef } from "react";
import style from "./index.module.sass";
const Switch = forwardRef(function Switch(props,ref){
    return <label className={style["switch"]}>
      <input type="checkbox" {...props} ref={ref}/>
      <span className={style["slider"]}></span>
    </label>
});
export default Switch;
