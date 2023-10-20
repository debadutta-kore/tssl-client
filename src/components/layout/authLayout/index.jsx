import { Outlet } from "react-router";
import Footer from "../../footer";
import logo from "../../../assets/kore.ai.svg";
import style from './index.module.sass';
import { useEffect } from "react";
function AuthLayout() {
  useEffect(()=>{
    document.body.style.background = 'url(/doughnut.svg) no-repeat center/contain #EBB8B8'
  },[])
  return (
    <>
      <div className={style["layout-container"]}>
        <Outlet />
      </div>
      <Footer
        style={{ borderTopColor: "#E08E8E" }}
      >
        <img src={logo} alt="kore.ai" />
        <span>v R.1.0.0</span>
      </Footer>
    </>
  );
}

export default AuthLayout;
