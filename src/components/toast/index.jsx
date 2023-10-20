import style from "./index.module.sass";
import error from "../../assets/icons/error.svg";
import success from "../../assets/icons/success.svg";
import warn from '../../assets/icons/warn.svg';
/**
 * 
 * @param {{message:string,status:'error'|'warn'|'success'}} props 
 * @returns 
 */
function Toast(props) {
    let icon, toastClass;
    if(props.status==="error"){
        icon=error;
        toastClass = `${style['toast']} ${style['toast-error']}`
    } else if(props.status==="warn"){
        icon = warn
        toastClass = `${style['toast']} ${style['toast-warn']}`
    } else {
        icon = success;
        toastClass = `${style['toast']} ${style['toast-success']}`
    }
  return (
    <div className={toastClass}>
      <img src={icon} alt="icon" width={20} height={20}/>
      <span className={style['toast-message']}>{props.message}</span>
    </div>
  );
}
export default Toast;
