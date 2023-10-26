import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/card";
import Switch from "../../../components/switch";
import style from "./index.module.sass";
import { useEffect } from "react";
import { fetchControl, updateAccess } from "../../../app/features/controlSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
function AccessControls() {
  const control = useSelector((state) => state.control);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchControl());
  }, [dispatch]);
  const onChangeAccessHandler = (event) => {
    dispatch(updateAccess({
      enable: event.target.checked ? 1 : 0
    }))
      .then(unwrapResult)
      .then(() => {
        const status = event.target.checked ? 'blocked' : 'unblocked';
        toast(`User is ${status} successfully`, { type: 'success' });
      }).catch(() => {
        toast('Something is went wrong', { type: 'error' })
      })
  };
  return (
    <div className={style["access-control-list"]}>
      {control.name && <Card className={style["control-card"]}>
        <span className={style["control-card__label"]}>User Access Control</span>
        <div>
          <span>{control.name}</span>
        </div>
        <Switch onChange={onChangeAccessHandler} checked={control.enable === 1} />
      </Card>}
    </div>
  );
}

export default AccessControls;
