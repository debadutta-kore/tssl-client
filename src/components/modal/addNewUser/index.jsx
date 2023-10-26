import Modal, { ModalBody } from "..";
import Card from "../../card";
import Button from "../../button";
import style from './index.module.sass';
import closeBtn from '../../../assets/icons/close-modal.svg';
import { Formik, Form } from "formik";
import InputField from "../../InputField";
import * as Yup from 'yup';
import { emailSchema, fullNameSchema, passwordSchema } from "../../../utilities/validateSchema";
import { useDispatch } from "react-redux";
import { createUser } from "../../../app/features/usersSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
function AddNewUser(props) {
  const dispatch = useDispatch();
  const onAddUser = (value, action) => {
    dispatch(createUser({
      email: value.email,
      name: value.fullName,
      password: value.password,
    }))
      .then(unwrapResult)
      .then(() => {
        toast(`User ${value.fullName} Added Successfully`, { type: 'success' })
      }).catch(() => {
        toast(`Unable to add ${value.fullName} as a user`, { type: 'error' })
      }).finally(() => {
        action.setSubmitting(false)
        props.onClose();
      })
  }
  return (
    <Modal>
      <ModalBody>
        <Formik initialValues={{ fullName: '', email: '', password: '' }} validationSchema={Yup.object({
          fullName: fullNameSchema,
          email: emailSchema,
          password: passwordSchema
        })} onSubmit={onAddUser}>
          {({ isValid, isSubmitting }) => (
            <Card>
              <div className={style["choose-user-header"]}>
                <h2>Add New User</h2>
                <button className={style['close-btn']} onClick={props.onClose} disabled={isSubmitting}>
                  <img src={closeBtn} alt="close-modal" />
                </button>
              </div>
              <Form className={style['addnewuser-form']}>
                <InputField type="text" placeholder="Enter Name" label="Name" name="fullName" required={true} />
                <InputField type="email" placeholder="Enter Email ID" label="Email ID" name="email" required={true} />
                <InputField type="password" placeholder="Enter Password" label="Password" name="password" required={true} />
                <div className={style['btn-container']}>
                  <Button onClick={props.onClose} disabled={isSubmitting}>Cancel</Button>
                  <Button type="submit" isLoading={isSubmitting} disabled={!isValid}>Proceed</Button>
                </div>
              </Form>
            </Card>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
}
export default AddNewUser;
