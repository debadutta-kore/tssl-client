import Card from "../../../components/card";
import Switch from "../../../components/switch";
import style from "./index.module.sass";
function AccessControls() {
  return (
    <div className={style["access-control-list"]}>
        <Card className={style["control-card"]}>
        <span className={style["control-card__label"]}>User Access Control</span>
          <div>
            <span>Use Cases</span>
          </div>
          <Switch />
        </Card>
    </div>
  );
}

export default AccessControls;
