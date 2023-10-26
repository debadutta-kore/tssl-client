import Header from "../../header";
import arrow from "../../../assets/icons/Arrow Back.svg";
import style from '../settingsLayout/index.module.sass';
import { useNavigate, useParams } from "react-router-dom";
import usecaseDb from '../../../utilities/static-usecases.json';
import ChatSplashScreen from "../../modal/chatSplashScreen";
import { useEffect, useState } from "react";
function ChatLayout() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const params = useParams();
  useEffect(()=>{
    setTimeout(()=>{
        setShowSplash(false);
    },3000)
  },[])
  const usecaseInfo =  usecaseDb.find(({id})=>(params.id===id));
  return (
    <>
    {showSplash && <ChatSplashScreen {...usecaseInfo}/>}
      <Header>
        <nav className={style["nav-bar"]}>
          <button onClick={() => navigate(-1)}>
            <img src={arrow} alt="back" width={30} height={30} />
          </button>
          <h3>{usecaseInfo.name}</h3>
        </nav>
      </Header>
    </>
  );
}

export default ChatLayout;
