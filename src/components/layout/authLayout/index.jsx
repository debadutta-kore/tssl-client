import { Outlet } from "react-router-dom";
import Footer from "../../footer";
import logo from "../../../assets/kore.ai.svg";
import style from './index.module.sass';
function AuthLayout() {

  return (
    <>
      <main className={style["layout-container"]}>
        <Outlet />
      </main>
      <Footer
        style={{ borderTopColor: "#E08E8E", background: '#EBB8B8'}}
      >
        <img src={logo} alt="kore.ai" />
        <span>v R.1.0.0</span>
      </Footer>
    </>
  );
}

export default AuthLayout;
