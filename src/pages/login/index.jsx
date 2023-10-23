import Card from "../../components/card";
import style from "./index.module.sass";
import appIcon from "../../assets/app-icon.svg";
import Button from "../../components/button";
import { Form, Formik } from "formik";
import InputField from "../../components/InputField";
import * as Yup from "yup";
import { emailSchema, passwordSchema } from "../../utilities/validateSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/features/useAuthSlice";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

function Login() {
  const { isLogin, role, choosedUser } = useSelector((state) => ({
    isLogin: state.auth.isLogin,
    role: state.auth.role,
    choosedUser : state.auth.choosedUser
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (isLogin) {
      if (role === "admin") {
        if(choosedUser) {
          navigate("/home");
        } else {
          navigate("/choose");
        }
      } else {
        navigate("/home");
      }
    }
  }, [isLogin, navigate, role, choosedUser]);

  const onSubmitHandler = (values) => {
    dispatch(
      login({
        url: "/auth/login",
        method: "POST",
        data: {
          email: values.email,
          password: values.password,
        },
      })
    );
  };


  return !isLogin && !location?.state?.loginFailed ? (
    <Navigate to="/auth/check" replace={true} />
  ) : (
    <Card className={style["login"]}>
      <div className={style["branding"]}>
        <img src={appIcon} alt="appicon" width={30} height={30} />
        <h1 className={style["title"]}>FoodAssist</h1>
      </div>
      <h5 className={style["subtitle"]}>Login</h5>
      <Formik
        onSubmit={onSubmitHandler}
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: emailSchema,
          password: passwordSchema,
        })}
      >
        <Form className={style["loginForm"]}>
          <InputField
            type="email"
            name="email"
            label="Email ID"
            placeholder="Enter Email ID"
          />
          <InputField
            type="password"
            name="password"
            label="Password"
            placeholder="Enter Password"
          />
          {/* <Link to="../reset" style={{ marginLeft: "auto" }}>
            Reset Password?
          </Link> */}
          <Button type="sumbmit">Login</Button>
        </Form>
      </Formik>
    </Card>
  );
}

export default Login;
