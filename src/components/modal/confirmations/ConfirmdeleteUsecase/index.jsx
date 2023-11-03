import { useDispatch, useSelector } from "react-redux";
import Confirm from "..";
import closeIcon from "../../../../assets/icons/close-modal.svg";
import deleteIcon from "../../../../assets/icons/delete.svg";
import Button from "../../../button";
import style from "../index.module.sass";
import { deleteUsecase } from "../../../../app/features/usecaseSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
function ConfirmDeleteUsecase(props) {
  const isLoading = useSelector((state) => state.usecases.isLoading);
  const dispatch = useDispatch();
  const onDeleteHandler = () => {
    dispatch(deleteUsecase({ id: props.delete.id }))
      .then(unwrapResult)
      .then(() => {
        toast("Use Case Deleted", { type: "success" });
      })
      .catch((err) => {
        if(err.name !== 'ConditionError'){
          toast(err.message, { type: "error" });
        }
      })
      .finally(() => {
        props.onClose();
      });
  };
  return (
    <Confirm>
      <button
        className={style["close-btn"]}
        onClick={props.onClose}
        disabled={isLoading}
      >
        <img src={closeIcon} alt="close-icon" width={40} height={40} />
      </button>
      <img
        src={deleteIcon}
        width={20}
        height={20}
        className={style["delete-icon"]}
      />
      <h2>Remove Use Case</h2>
      <span>Are you sure you want to remove {props.delete.name} ?</span>
      <div className={style["delete-btn-container"]}>
        <Button onClick={props.onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={onDeleteHandler} isLoading={isLoading}>
          Remove
        </Button>
      </div>
    </Confirm>
  );
}

export default ConfirmDeleteUsecase;
