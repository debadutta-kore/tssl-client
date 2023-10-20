import style from "./index.module.sass";
import Card from "../../components/card";
import { Link } from "react-router-dom";
import chavron from "../../assets/icons/chavron.svg";

function Settings() {
  return (
    <>
      <div className={style["settings-list"]}>
      <Link to="./access">
          <Card className={style["settings-list__card"]}>
            <div>
              <span>Access Controls</span>
            </div>
            <div>
                <img src={chavron} alt="chavron" width={15} height={15} />
            </div>
          </Card>
        </Link>
        <Link to="./usecases">
          <Card className={style["settings-list__card"]}>
            <div>
              <span>Use Cases</span>
            </div>
            <div>
              <img src={chavron} alt="chavron" width={15} height={15} />
            </div>
          </Card>
        </Link>
      </div>
    </>
  );
}

export default Settings;
