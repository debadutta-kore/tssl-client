import Button from "../../components/button";
import Card from "../../components/card";
import AddIcon from "../../assets/icons/Add.svg";
import style from "./index.module.sass";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import AddNewUser from "../../components/modal/addNewUser";
import UserOption from "../../components/userOption";
import { connect, useDispatch} from "react-redux";
import { fetchAllUser } from "../../app/features/usersSlice";
import { useNavigate } from "react-router-dom";
import { updateSession } from "../../app/features/authSlice";
import { toast } from "react-toastify";
import withRoleValidation from "../../components/hoc/validateRoute";
import LoadingSpinner from "../../components/loadingSpinner";
import { unwrapResult } from "@reduxjs/toolkit";
import { resetUsecase } from "../../app/features/usecaseSlice";

const Component = withRoleValidation(
  function (props) {
    const [addNewUser, setAddNewUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(fetchAllUser()).then(unwrapResult)
        .catch((err) => {
          if (err.name !== 'ConditionError') {
            toast(err.message, { type: "error" });
          }
        });
    }, [dispatch]);

    const onSubmitHandler = (value, action) => {
      const userId = value.user.trim();
      const [user] =  props.users.filter(({id})=>id===userId);
      dispatch(updateSession({userId, user}))
        .then(() => {
          //navigate to home
          dispatch(resetUsecase());
          navigate("/home");
        })
        .catch((err) => {
          //notify user
          toast(err.message, { type: "error" });
        })
        .finally(() => {
          action.setSubmitting(false);
        });
    };

    return (
      <Card className={style["choose-user"]}>
        {addNewUser && (
          <AddNewUser onClose={() => setAddNewUser(!addNewUser)} />
        )}
        <div className={style["choose-user-header"]}>
          <h2>Choose User</h2>
          <Button onClick={() => setAddNewUser(!addNewUser)}>
            <img src={AddIcon} width={15} height={15} />
            <span>Add User</span>
          </Button>
        </div>
        <Formik initialValues={{ user: "" }} onSubmit={onSubmitHandler}>
          {({ isSubmitting, values, resetForm }) => (
            <Form className={style["choose-user-form"]}>
              {props.users.length > 0 ? (
                <ul className={style["users-list"]}>
                  {props.users.map((user) => (
                    <UserOption
                      name={user.name}
                      value={user.id}
                      key={user.id}
                      onDelete={() => resetForm({ user: "" })}
                    />
                  ))}
                </ul>
              ) : !props.isLoading ? (
                <div className={style["choose-user-placeholder"]}>
                  <h3>No Users Added Yet.</h3>
                  <span>
                    Please add user by clicking on the “+ Add User” button.
                  </span>
                </div>
              ) : (
                <div className={"loading-container"}>
                  <LoadingSpinner />
                </div>
              )}
              <Button
                type="submit"
                disabled={!values.user.trim()}
                isLoading={isSubmitting}
              >
                Proceed
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    )
  },
  ["admin"]
);

const mapStateToProp = (state)=>({
  isChoosedUser: state.auth.choosedUser,
  isLoading: state.users.isLoading,
  users: state.users.users
});

const ChooseUser = connect(mapStateToProp)(Component);
export default ChooseUser;
