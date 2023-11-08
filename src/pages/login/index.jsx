import Card from "../../components/card";
import style from "./index.module.sass";
import appIcon from "../../assets/app-icon.svg";
import Button from "../../components/button";
import { Form, Formik } from "formik";
import InputField from "../../components/InputField";
import * as Yup from "yup";
import { emailSchema, passwordSchema } from "../../utilities/validateSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/features/authSlice";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

function Login() {
  const { isLogin, role } = useSelector((state) => ({ isLogin: state.auth.isLogin, role: state.auth.role }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onSubmitHandler = (values, action) => {
    dispatch(
      login({
        url: "/auth/login",
        method: "POST",
        data: {
          email: values.email.toLowerCase(),
          password: values.password,
        },
      })
    ).then(unwrapResult).then((data) => {
      toast("Login successful", { type: 'success' })
      if (data.role === "admin") {
        navigate("/choose");
      } else {
        navigate("/home");
      }
    }).catch((err) => {
      if (typeof err.data === 'object') {
        if (err.data.password) {
          action.setFieldError('password', err.data.password);
        } else {
          action.setFieldError('email', err.data.email);
        }
      } else {
        if(err.name !== "ConditionError") {
          toast(err.message, { type: "error" });
        }
      }
    }).finally(() => {
      action.setSubmitting(false);
    })
  };

  if (isLogin) {
    return <Navigate to={role === 'admin' ? '/choose' : '/home'} replace={true} />
  } else {
    if (!location.state?.isLoginFailed) {
      return <Navigate to="/auth/check" replace={true} />;
    } else {
      return <Card className={style["login"]}>
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
          {({ isValid, isSubmitting }) => (
            <Form className={style["loginForm"]}>
              <InputField
                type="email"
                name="email"
                label="Email ID"
                placeholder="Enter Email ID"
                required={true}
              />
              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                required={true}
              />
              {/* <Link to="../reset" style={{ marginLeft: "auto" }}>
            Reset Password?
          </Link> */}
              <Button type="sumbmit" isLoading={isSubmitting} disabled={!isValid} className={style['btn-submit']}>Login</Button>
            </Form>
          )}
        </Formik>
      </Card>;
    }
  }
}

export default Login;
