import style from "./index.module.sass";
function Switch(props){
    return <label className={style["switch"]}>
      <input type="checkbox" {...props}/>
      <span className={style["slider"]}></span>
    </label>
}
export default Switch;
