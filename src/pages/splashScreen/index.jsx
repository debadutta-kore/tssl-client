import { useNavigate } from "react-router";
import appIcon from "../../assets/app-icon.svg";
import style from "./index.module.sass";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "../../utilities/request";
import { saveAuth } from "../../app/features/useAuthSlice";
const SplashScreen = () => {
  const { isLogin, role } = useSelector((state) => ({
    isLogin: state.auth.isLogin,
    role: state.auth.role,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin) {
      if (role === "user") {
        navigate("/home");
      } else {
        navigate("/choose");
      }
    } else {
      request({
        url: "/auth/session",
        method: "GET",
      }).then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => {
              dispatch(
                saveAuth({
                  ...data,
                  isLogin: true,
                })
              );
              if (role === "user") {
                navigate("/home");
              } else {
                navigate("/choose");
              }
            })
            .catch(() => {
              navigate("/auth/login", { state: { loginFailed: true } });
            });
        } else {
          navigate("/auth/login", { state: { loginFailed: true } });
        }
      });
    }
  }, [isLogin, navigate, dispatch, role]);
  return (
    <div className={style["splash-screen-container"]}>
      <img src={appIcon} alt="app-icon" width={40} height={40} />
      <h1>FoodAssist</h1>
    </div>
  );
};
export default SplashScreen;
