import { useNavigate, useLocation } from "react-router-dom";
import appIcon from "../../assets/app-icon.svg";
import style from "./index.module.sass";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginWithSession } from "../../app/features/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllUsecases } from "../../app/features/usecaseSlice";
import { fetchAllUser } from "../../app/features/usersSlice";
import { fetchControl } from "../../app/features/controlSlice";
const SplashScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loginWithSession())
      .then(unwrapResult)
      .then((data) => {
        Promise.allSettled(
          data.role === "user"
            ? [dispatch(fetchAllUsecases())]
            : data.role === "admin" && data.isChoosedUser
            ? [
                dispatch(fetchAllUsecases()),
                dispatch(fetchAllUser()),
                dispatch(fetchControl()),
              ]
            : [dispatch(fetchAllUser())]
        )
          .then(() => {
            if (data.role === "user") {
              navigate(location.state?.from.pathname || "/home", {
                replace: true,
              });
            } else {
              if (data.isChoosedUser) {
                navigate(location.state?.from.pathname || "/home", {
                  replace: true,
                });
              } else {
                navigate("/choose", { replace: true });
              }
            }
          })
          .catch(() => {
            toast("Something Went Wrong", { type: "error" });
          });
      })
      .catch((err) => {
        if (err.name !== "ConditionError") {
          toast(err.message, { type: "error" });
        }
        //Navigate to login if anything goes wrong
        navigate("/auth/login", {
          state: { isLoginFailed: true },
          replace: true,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style["splash-screen-container"]}>
      <img src={appIcon} alt="app-icon" width={40} height={40} />
      <h1>FoodAssist</h1>
    </div>
  );
};
export default SplashScreen;
