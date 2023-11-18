import { createPortal } from "react-dom";
import style from "./index.module.sass";
export const ModalBody = function ({ children, className, ...props }) {
  return (
    <div
      className={
        className ? `${style["modal-body"]} ${className}` : style["modal-body"]
      }
      {...props}
    >
      {children}
    </div>
  );
};
function Modal(props) {
  return createPortal(
    <div className={style["modal"]} style={props.style} onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("modal")
  );
}
export default Modal;
