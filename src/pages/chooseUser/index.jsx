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
import { chooseUser } from "../../app/features/useAuthSlice";
import { useNavigate } from "react-router";
function ChooseUser() {
  const [addNewUser, setAddNewUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {users, userId} = useSelector((state) => ({users:state.users.users, userId: state.auth.userId}));
  
  useEffect(()=>{
    dispatch(fetchAllUser());
  },[dispatch]);

  const onSubmitHandler = (value)=>{
    dispatch(chooseUser(value.user)),
    navigate('/home')
  }
  return (
    <Card>
      {addNewUser && <AddNewUser onClose={() => setAddNewUser(!addNewUser)} />}
      <div className={style["choose-user-header"]}>
        <h2>Choose User</h2>
        <Button onClick={() => setAddNewUser(!addNewUser)}>
          <img src={AddIcon} width={15} height={15} />
          <span>Add User</span>
        </Button>
      </div>
      <Formik initialValues={{user: userId}} onSubmit={onSubmitHandler}>
        <Form className={style["choose-user-form"]}>
          {
            users.length > 0 ?
              <ul className={style["users-list"]}>
                {users.map((user) => <UserOption name={user.name} value={user.id} key={user.id} />)}
              </ul> : <div className={style["choose-user-placeholder"]}>
                <h3>No Users Added Yet.</h3>
                <span>Please add user by clicking on the “+ Add User” button.</span>
              </div>
          }
          <Button type="submit">Proceed</Button>
        </Form>
      </Formik>
    </Card>
  );
}
export default ChooseUser;
