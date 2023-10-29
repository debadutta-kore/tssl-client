import Button from "../../components/button";
import Card from "../../components/card";
import AddIcon from "../../assets/icons/Add.svg";
import style from "./index.module.sass";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import AddNewUser from "../../components/modal/addNewUser";
import UserOption from "../../components/userOption";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../app/features/usersSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { updateSession } from "../../app/features/authSlice";
import { toast } from "react-toastify";

function ChooseUser() {
  const [addNewUser, setAddNewUser] = useState(false);
  const isChoosedUser = useSelector((state) => state.auth.choosedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const onSubmitHandler = (value, action) => {
    const userId = value.user.trim();
    if (userId) {
      dispatch(updateSession(userId))
        .then(() => {
          //navigate to home
          navigate("/home");
        })
        .catch(() => {
          //notify user
          toast('Something went wrong', { type: 'error' });
        }).finally(() => {
          action.setSubmitting(false);
        });
    } else {
      action.setFieldError('user', 'error');
    }
  };

  return (
    !isChoosedUser ? <Card>
      {addNewUser && <AddNewUser onClose={() => setAddNewUser(!addNewUser)} />}
      <div className={style["choose-user-header"]}>
        <h2>Choose User</h2>
        <Button onClick={() => setAddNewUser(!addNewUser)}>
          <img src={AddIcon} width={15} height={15} />
          <span>Add User</span>
        </Button>
      </div>
      <Formik initialValues={{ user: '' }} onSubmit={onSubmitHandler}>
        {({ isSubmitting, values }) => (
          <Form className={style["choose-user-form"]}>
            {users.length > 0 ? (
              <ul className={style["users-list"]}>
                {users.map((user) => (
                  <UserOption name={user.name} value={user.id} key={user.id} />
                ))}
              </ul>
            ) : (
              <div className={style["choose-user-placeholder"]}>
                <h3>No Users Added Yet.</h3>
                <span>
                  Please add user by clicking on the “+ Add User” button.
                </span>
              </div>
            )}
            <Button type="submit" disabled={!values.user.trim()} isLoading={isSubmitting}>
              Proceed
            </Button>
          </Form>
        )}
      </Formik>
    </Card> : <Navigate to="/home" replace={true} />
  );
}

export default ChooseUser;
