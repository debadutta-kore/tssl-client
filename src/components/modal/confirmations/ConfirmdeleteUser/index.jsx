import { useDispatch, useSelector } from "react-redux";
import Confirm from "..";
import closeIcon from "../../../../assets/icons/close-modal.svg";
import deleteIcon from '../../../../assets/icons/delete.svg';
import Button from "../../../button";
import style from "../index.module.sass";
import { deleteUser } from "../../../../app/features/usersSlice";
import { toast } from "react-toastify";
function ConfirmDeleteUser(props) {
  const dispatch = useDispatch()
  const isLoading = useSelector((state)=>state.users.isLoading);
  const onRemoveHandler = ()=>{
    dispatch(deleteUser({
        userId: props.delete.id
    })).then(()=>{
      toast('The user has been successfully deleted',{
        type:'success'
      });
    }).catch(()=>{
      toast("Oops, Something Went Wrong: We couldn't delete the user at this time",{
        type:'error'
      });
    }).finally(()=>{
      props.onClose();
    })
  }
  return (
    <Confirm>
      <button className={style["close-btn"]} onClick={props.onClose} disabled={isLoading}>
        <img src={closeIcon} alt="close-icon" width={40} height={40} />
      </button>
      <img src={deleteIcon} width={20} height={20} className={style['delete-icon']}/>
      <h2>Remove User</h2>
      <span>Are you sure you want to remove {props.delete.name}</span>
      <div className={style["delete-btn-container"]}>
        <Button type="button" onClick={props.onClose} disabled={isLoading}>Cancel</Button>
        <Button type="button"  onClick={onRemoveHandler} isLoading={isLoading}>Remove</Button>
      </div> 
    </Confirm>
  );
}

export default ConfirmDeleteUser;
