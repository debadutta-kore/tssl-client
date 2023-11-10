import { useNavigate, useLocation, Navigate } from "react-router-dom";
import appIcon from "../../assets/app-icon.svg";
import style from "./index.module.sass";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithSession } from "../../app/features/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const SplashScreen = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      dispatch(loginWithSession())
        .then(unwrapResult)
        .then((data) => {
          if (data.role === "user") {
            navigate(location.state?.from.pathname || "/home");
          } else {
            if (data.isChoosedUser) {
              navigate(location.state?.from.pathname || "/home");
            } else {
              navigate("/choose");
            }
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            navigate("/auth/login", {
              state: { isLoginFailed: true },
              replace: true,
            });
          } else if(err.name !== "ConditionError") {
            toast(err.message, { type: "error" });
          }
        });
    }
  }, [navigate, dispatch, location, isLogin]);
  return isLogin ? (
    <Navigate to={location.state?.from.pathname || "/home"} replace={true} />
  ) : (
    <div className={style["splash-screen-container"]}>
      <img src={appIcon} alt="app-icon" width={40} height={40} />
      <h1>FoodAssist</h1>
    </div>
  );
};
export default SplashScreen;
