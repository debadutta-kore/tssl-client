import { createPortal } from "react-dom";
import style from "./index.module.sass";
function Modal(props) {
  return createPortal(<div className={style['modal']}>
    <div className={style["modal-body"]}>
    {props.children}
    </div>
  </div>, document.getElementById("modal"));
}
export default Modal;
