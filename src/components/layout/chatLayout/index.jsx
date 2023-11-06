import Header from "../../header";
import arrow from "../../../assets/icons/Arrow Back.svg";
import settingStyle from '../settingsLayout/index.module.sass';
import style from './index.module.sass';
import { useNavigate, useParams } from "react-router-dom";
import usecaseDb from '../../../utilities/static-usecases.json';
import ChatSplashScreen from "../../modal/chatSplashScreen";
import { useState } from "react";

function ChatLayout() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const params = useParams();

  const usecaseInfo =  usecaseDb.find(({id})=>(params.id===id));

  return (
    <>
    {showSplash && <ChatSplashScreen {...usecaseInfo}/>}
      <Header>
        <nav className={settingStyle["nav-bar"]}>
          <button onClick={() => navigate(-1)}>
            <img src={arrow} alt="back" width={30} height={30} />
          </button>
          <h3>{usecaseInfo.name}</h3>
        </nav>
      </Header>
      <main className={style['layout-container']}>
        <iframe src={usecaseInfo.url} width={"100%"} height={"100%"} onLoad={()=>setShowSplash(false)}></iframe>
      </main>
    </>
  );
}

export default ChatLayout;
