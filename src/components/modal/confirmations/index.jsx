import Modal, { ModalBody } from "..";
import Card from "../../card";
import style from "./index.module.sass";
function Confirm(props) {
  return (
    <Modal>
      <ModalBody>
        <Card className={style["modal-content"]}>{props.children}</Card>
      </ModalBody>
    </Modal>
  );
}

export default Confirm;
