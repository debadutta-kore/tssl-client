import Modal from "..";
import Card from "../../card";
import Button from "../../button";
import style from './index.module.sass';
import closeBtn from '../../../assets/icons/close-modal.svg';
import { Formik, Form } from "formik";
import InputField from "../../InputField";
import * as Yup from 'yup';
import { emailSchema, fullNameSchema, passwordSchema } from "../../../utilities/validateSchema";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../app/features/usersSlice";
function AddNewUser(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.users.isLoading);
  const onAddUser = (value) => {
    dispatch(createUser({
      email: value.email,
      name: value.fullName,
      password: value.password,
    })).then(()=>{
      props.onClose();
    })
  }
  return (
    <Modal>
      <Card>
        <div className={style["choose-user-header"]}>
          <h2>Add New User</h2>
          <button className={style['close-btn']} onClick={props.onClose} disabled={isLoading}>
            <img src={closeBtn} alt="close-modal" />
          </button>
        </div>
        <Formik initialValues={{ fullName: '', email: '', password: '' }} validationSchema={Yup.object({
          fullName: fullNameSchema,
          email: emailSchema,
          password: passwordSchema
        })} onSubmit={onAddUser}>
          <Form className={style['addnewuser-form']}>
            <InputField type="text" placeholder="Enter Name" label="Name" name="fullName" />
            <InputField type="email" placeholder="Enter Email ID" label="Email ID" name="email" />
            <InputField type="password" placeholder="Enter Password" label="Password" name="password" />
            <div className={style['btn-container']}>
              <Button onClick={props.onClose} disabled={isLoading}>Cancel</Button>
              <Button type="submit">Proceed</Button>
            </div>
          </Form>
        </Formik>
      </Card>
    </Modal>
  );
}
export default AddNewUser;
