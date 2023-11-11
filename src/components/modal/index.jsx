import { createPortal } from "react-dom";
import style from "./index.module.sass";
export const ModalBody = (props)=>{
  return <div className={style["modal-body"]} style={props.style}>{props.children}</div>;
}
function Modal(props) {
  return createPortal(
    <div className={style["modal"]} style={props.style} onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("modal")
  );
}
export default Modal;
