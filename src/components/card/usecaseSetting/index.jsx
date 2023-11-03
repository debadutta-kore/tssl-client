import Card from "..";
import style from "./index.module.sass";
import deleteIcon from "../../../assets/icons/delete.svg";
import Switch from "../../switch";
import { useState } from "react";
import usecaseDb from "../../../utilities/static-usecases.json";
import ConfirmDeleteUsecase from "../../modal/confirmations/ConfirmdeleteUsecase";
import { useDispatch } from "react-redux";
import { updateUsecase } from "../../../app/features/usecaseSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { debounce } from "../../../utilities";

function UsecaseSetting(props) {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);

  const info = usecaseDb.find((usecase) => usecase.id === props.usecaseId);
  const onChangeStatus = debounce((event) => {
    const checked = event.target.checked;
    const status = checked ? "enabled" : "disabled";
    dispatch(
      updateUsecase({
        id: info.id,
        enable: checked,
      })
    )
      .then(unwrapResult)
      .then(() => {
        if (checked) {
          toast("Use Case enabled successfully!", { type: "success" });
        } else {
          toast(`Use Case disabled successfully!`, { type: "warning" });
        }
      })
      .catch(() => {
        toast(`Unable to ${status} ${info.name} usecase`, { type: "error" });
        if (event.target) {
          event.target.checked = !checked;
        }
      });
  }, 1000);

  return (
    <Card className={style["setting-cards"]}>
      {isDelete && (
        <ConfirmDeleteUsecase
          delete={{ id: props.id, name: info.name }}
          onClose={() => setIsDelete(!isDelete)}
        />
      )}
      <div className={style["card-heading"]}>
        <div className={style["info"]}>
          <span className={style["name"]}>{info.name}</span>
          <span
            className={style["status"]}
            style={{ display: info.isComingSoon ? "inline" : "none" }}
          >
            (Coming Soon)
          </span>
        </div>
        <div>
          <Switch
            defaultChecked={props.enable === 1 ? true : false}
            onChange={onChangeStatus}
          />
          <button onClick={() => setIsDelete(!isDelete)}>
            <img src={deleteIcon} alt="delete" width={20} height={20} />
          </button>
        </div>
      </div>
    </Card>
  );
}
export default UsecaseSetting;
