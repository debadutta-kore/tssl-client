import { NavLink } from "react-router-dom";
import Header from "../../header";
import ConfirmLogout from "../../modal/confirmations/Confirmlogout";
import HelpSupport from "../../modal/helpSupport";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from './index.module.sass';
import logout from "../../../assets/icons/logout.svg";
import helpSupportIcon from "../../../assets/icons/help.svg";
import settings from "../../../assets/icons/Settings.svg";
import appIcon from "../../../assets/app-icon.svg";

function HomeLayout(props) {
    const [helpSupport, setHelpSupport] = useState(false);
    const [islogout, setIsLogout] = useState(false);
    const role = useSelector((state) => state.auth.role);

    return <>
        {helpSupport && (
            <HelpSupport onClose={() => setHelpSupport(!helpSupport)} />
        )}
        {islogout && <ConfirmLogout onClose={() => setIsLogout(!islogout)} />}
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
                        onClick={() => setIsLogout(!islogout)}
                    >
                        <img src={logout} height={30} width={30} />
                    </button>
                </div>
            </nav>
        </Header>
        <main className={style['layout-container']}>
            {props.children}
        </main>
    </>
}

export default HomeLayout;