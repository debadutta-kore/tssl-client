import { useNavigate } from "react-router";
import appIcon from "../../assets/app-icon.svg";
import style from "./index.module.sass";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginWithSession } from "../../app/features/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const SplashScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.background = 'url(/doughnut.svg) no-repeat center/contain #EBB8B8'
    dispatch(loginWithSession())
    .then(unwrapResult)
    .then((data)=>{
      if(data.data.role === 'user') {
        navigate('/home');
      } else {
        if(data.data.name) {
          navigate('/home');
        } else {
          navigate('/choose');
        }
      }
    }).catch(()=>{
      navigate("/auth/login", { state: { loginFailed: true } });
    })
  }, [navigate, dispatch]);

  return (
    <div className={style["splash-screen-container"]}>
      <img src={appIcon} alt="app-icon" width={40} height={40} />
      <h1>FoodAssist</h1>
    </div>
  );
};
export default SplashScreen;
