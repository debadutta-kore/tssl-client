import { Outlet } from "react-router-dom";
import Footer from "../footer";
import logo from "../../assets/kore.ai.svg";
import { useEffect } from "react";

function Layout() {
  useEffect(()=>{
    document.body.style.background = '#F3F4F6'
  },[])
  return (
    <>
      <Outlet />
      <Footer style={{ borderTopColor: "#D2D6DB" }}>
        <img src={logo} alt="kore.ai" />
        <span>v R.1.0.0</span>
      </Footer>
    </>
  );
}

export default Layout;
