import { useDispatch, useSelector } from "react-redux";
import Confirm from "..";
import closeIcon from "../../../../assets/icons/close-modal.svg";
import logoutIcon from '../../../../assets/icons/logout-solid-rounded.svg';
import Button from "../../../button";
import style from "../index.module.sass";
import { logout } from "../../../../app/features/authSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
function ConfirmLogout(props) {
  const isLoading = useSelector((state)=>state.auth.isLoading);
  const dispatch = useDispatch();
  const logoutHandler = ()=>{
    dispatch(logout())
    .then(unwrapResult)
    .then(()=>{
      toast("You're logged out! Logout was successful",{type:'success'});
    }).catch(()=>{
      toast("We couldn't log you out due to an error. Please try again later",{type:'error'});
    }).finally(()=>{
      props.onClose();
    })
  }
  return (
    <Confirm>
      <button className={style["close-btn"]} onClick={props.onClose} disabled={isLoading}>
        <img src={closeIcon} alt="close-icon" width={40} height={40}/>
      </button>
      <img src={logoutIcon} width={20} height={20} className={style['logout-icon']}/>
      <h2>Logout</h2>
      <span>You will be returned to the login screen.</span>
      <div className={style["logout-btn-container"]}>
        <Button onClick={props.onClose} disabled={isLoading}>Cancel</Button>
        <Button onClick={logoutHandler} isLoading={isLoading}>Logout</Button>
      </div> 
    </Confirm>
  );
}

export default ConfirmLogout;
