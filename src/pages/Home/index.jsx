import { NavLink } from "react-router-dom";
import Header from "../../components/header";
import appIcon from "../../assets/app-icon.svg";
import style from "./index.module.sass";
import settings from "../../assets/icons/Settings.svg";
import illustration from "../../assets/Illustration.svg";
import Button from "../../components/button";
import helpSupportIcon from "../../assets/icons/help.svg";
import AddUseCase from "../../components/modal/addUseCase";
import { useEffect, useState } from "react";
import HelpSupport from "../../components/modal/helpSupport";
import logout from "../../assets/icons/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsecases } from "../../app/features/usecaseSlice";
import UseCaseCard from "../../components/card/usecaseCard";
import ConfirmLogout from "../../components/modal/confirmations/Confirmlogout";

function Home() {
  const [addUsecase, setAddUsecase] = useState(false);
  const [helpSupport, setHelpSupport] = useState(false);
  const {role, usecases} = useSelector((state)=>({role: state.auth.role, usecases: state.usecases.usecases}));
  const dispatch = useDispatch();
  const [islogout, setIsLogout] = useState(false);

  useEffect(()=>{
    dispatch(fetchAllUsecases());
  },[dispatch]);
  return (
    <>
      {addUsecase && <AddUseCase onClose={() => setAddUsecase(!addUsecase)} />}
      {helpSupport && (
        <HelpSupport onClose={() => setHelpSupport(!helpSupport)} />
      )}
      {islogout && <ConfirmLogout onClose={()=>setIsLogout(!islogout)}/>}
      <Header>
        <nav className={style["nav-bar"]}>
          <NavLink to="/home">
            <div className={style["branding"]}>
              <img src={appIcon} alt="appicon" width={20} height={20} />
              <h1 className={style["title"]}>FoodAssist</h1>
            </div>
          </NavLink>
          <div className={style["icons-container"]}>
            <button onClick={() => setHelpSupport(!helpSupport)}>
              <img src={helpSupportIcon} height={30} width={30} />
            </button>
            <NavLink
              to="/settings"
              style={{ display: role === "admin" ? "inline" : "none" }}
            >
              <img src={settings} width={30} height={30} />
            </NavLink>
            <button
              style={{ display: role === "user" ? "inline" : "none" }}
              onClick={()=>setIsLogout(!islogout)}
            >
              <img src={logout} height={30} width={30} />
            </button>
          </div>
        </nav>
      </Header>
      {usecases.length === 0 ? <div className={style["container"]}>
        <div className={style["placeholder"]}>
          <img src={illustration} width={200} height={100} />
          <h3>No Use-Cases Added Yet!</h3>
          <h4>To add use-case press on the below button</h4>
          <Button onClick={() => setAddUsecase(!addUsecase)}>
            Add Use Case
          </Button>
        </div>
      </div>: <ul className={style['usecases-grid-container']}>
        {usecases.filter(({enable})=>(enable===1)).map((usecase)=>(<li key={usecase.id} className={style['usecase-item']}><UseCaseCard {...usecase}/></li>))}
        </ul>}
    </>
  );
}
export default Home;
