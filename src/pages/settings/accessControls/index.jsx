import { useSelector } from "react-redux";
import Card from "../../../components/card";
import Switch from "../../../components/switch";
import style from "./index.module.sass";
function AccessControls() {
  const userName = useSelector((state)=>state.auth.name);
  return (
    <div className={style["access-control-list"]}>
        <Card className={style["control-card"]}>
        <span className={style["control-card__label"]}>User Access Control</span>
          <div>
            <span>{userName}</span>
          </div>
          <Switch />
        </Card>
    </div>
  );
}

export default AccessControls;
