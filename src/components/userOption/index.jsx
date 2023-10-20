import selectIcon from "../../assets/icons/select.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import style from "./index.module.sass";
import { useId, useState } from "react";
import ConfirmDeleteUser from "../modal/confirmations/ConfirmdeleteUser";
import { Field } from "formik";
function UserOption(props) {
  const elementId = useId();
  const [deleteUser, setDeleteUser] = useState(false);
  return (
    <li className={style["option"]}>
      <Field
        type="radio"
        name="user"
        id={elementId}
        style={{ display: "none" }}
        className={style["radio"]}
        value={props.value}
      />
      {deleteUser && (
        <ConfirmDeleteUser
          onClose={() => setDeleteUser(!deleteUser)}
          delete={{ name: props.name, id: props.value }}
        />
      )}
      <label htmlFor={elementId} className={style["select-user"]}>
        <span>{props.name}</span>
        <img src={selectIcon} alt="check-icon" />
      </label>
      <button
        className={style["delete-user"]}
        onClick={() => setDeleteUser(!deleteUser)}
        type="button"
      >
        <img src={deleteIcon} alt="delete-icon" width={15} height={15} />
      </button>
    </li>
  );
}

export default UserOption;
