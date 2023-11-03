import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/card";
import Switch from "../../../components/switch";
import style from "./index.module.sass";
import { useEffect } from "react";
import { fetchControl, updateAccess } from "../../../app/features/controlSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { debounce } from "../../../utilities";
import LoadingSpinner from "../../../components/loadingSpinner";
function AccessControls() {
  const control = useSelector((state) => state.control);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchControl())
    .then(unwrapResult)
    .catch((err)=>{
      toast(err.message,{type:'error'})
    });
  }, [dispatch]);

  const onChangeAccessHandler = debounce((event) => {
    const checked = event.target.checked;
    dispatch(
      updateAccess({
        enable: checked ? 1 : 0,
      })
    )
      .then(unwrapResult)
      .then(() => {
        const status = checked ? "unblocked" : "blocked";
        toast(`User is ${status} successfully`, { type: "success" });
      })
      .catch((err) => {
        if (event.target) {
          event.target.checked = !checked;
        }
        toast(err.message, { type: "error" });
      });
  }, 1000);

  return control.name ? (
    <div className={style["access-control-list"]}>
      <Card className={style["control-card"]}>
        <span className={style["control-card__label"]}>
          User Access Control
        </span>
        <div>
          <span>{control.name}</span>
        </div>
        <Switch
          onChange={onChangeAccessHandler}
          defaultChecked={control.enable === 1}
        />
      </Card>
    </div>
  ) : (
    <div className="loading-container">
      <LoadingSpinner />
    </div>
  );
}

export default AccessControls;
