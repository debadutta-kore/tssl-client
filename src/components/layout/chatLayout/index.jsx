import Header from "../../header";
import arrow from "../../../assets/icons/Arrow Back.svg";
import settingStyle from "../settingsLayout/index.module.sass";
import style from "./index.module.sass";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import ChatSplashScreen from "../../chatSplashScreen";

function ChatLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const usecases = useSelector((state) => state.usecases.usecases);
  if (!location?.state?.id) {
    return <Navigate to="/home" />;
  } else {
    const usecaseInfo = usecases.find(({ id }) => location.state.id === id);

    return (
      <>
        <Header>
          <nav className={settingStyle["nav-bar"]}>
            <button onClick={() => navigate(-1)}>
              <img src={arrow} alt="back" width={30} height={30} />
            </button>
            <h3>{usecaseInfo.name}</h3>
          </nav>
        </Header>
        <main className={style["layout-container"]}>
          <Suspense
            fallback={
              <ChatSplashScreen
                icon={usecaseInfo.icon}
                name={usecaseInfo.name}
                theme={usecaseInfo.theme}
              />
            }
            maxDuration={2000}
          >
            <Outlet context={{ usecaseInfo }} />
          </Suspense>
        </main>
      </>
    );
  }
}

export default ChatLayout;
