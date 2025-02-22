import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../header";
import arrow from "../../../assets/icons/Arrow Back.svg";
import style from "./index.module.sass";
import Button from "../../button";
import logout from "../../../assets/icons/Exit.svg";
import { useSelector } from "react-redux";
import addIcon from '../../../assets/icons/Add.svg'
import AddUseCase from "../../modal/addUseCase";
import { useState } from "react";
import ConfirmLogout from "../../modal/confirmations/Confirmlogout";
import withRoleValidation from "../../hoc/validateRoute";

const SettingsLayout = withRoleValidation(function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const usecases = useSelector((state) => state.usecases.usecases);
  const [addUsecase, setAddUsecase] = useState(false);
  const [islogout, setIsLogout] = useState(false);

  const pathname = location.pathname;
  const pathParts = pathname.split("/");
  let headerName;
  if (pathParts[pathParts.length - 1] === "usecases") {
    headerName = "Use Cases";
  } else if (pathParts[pathParts.length - 1] === "access") {
    headerName = "Access Control";
  } else {
    headerName = "Settings";
  }

  return (
    <>
      {addUsecase && <AddUseCase onClose={() => setAddUsecase(!addUsecase)} />}
      {islogout && <ConfirmLogout onClose={() => setIsLogout(!islogout)} />}
      <Header>
        <nav className={style["nav-bar"]}>
          <button onClick={() => navigate(-1)}>
            <img src={arrow} alt="back" width={30} height={30} />
          </button>
          <h3>{headerName}</h3>
          {(pathParts[pathParts.length - 1] === "usecases" && usecases.length > 0) && <button onClick={() => setAddUsecase(!addUsecase)}>
            <img src={addIcon} alt="add" width={25} height={25} />
          </button>}
        </nav>
      </Header>
      <main className={style['settings-container']} style={{ bottom: pathParts[pathParts.length - 1] === 'settings' ? '8.5rem' : '3rem' }}>
        <Outlet context={{ setAddUsecase }} />
      </main>
      {pathParts[pathParts.length - 1] === 'settings' && <Button className={style["logout"]} onClick={() => setIsLogout(!islogout)}>
        <img src={logout} alt="logout" width={30} height={30} />
        <span>Logout</span>
      </Button>}
    </>
  );
}, ['admin']);

export default SettingsLayout;
