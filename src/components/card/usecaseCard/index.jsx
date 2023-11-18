import Card from "..";
import style from "./index.module.sass";
import { Link } from "react-router-dom";
function UseCaseCard(props) {

  let chatType = props.type;
  if (props.type === "websdk") {
    chatType = "text";
  } else {
    chatType = props.type;
  }
  return (
    <Link
      to={props.isComingSoon ? "#" : `/chat/${chatType}`}
      state={{ id: props.id }}
      onClick={(e) => props.isComingSoon && e.preventDefault()}
    >
      <Card
        className={style["usecaseCard"]}
        style={{ animationDelay: props.animationDelay }}
      >
        <div
          className={style["overlay"]}
          style={{
            background: `linear-gradient(137.55deg, ${props.theme} -4.46%, rgba(255, 255, 255, 0) 50%), linear-gradient(0deg, #FFFFFF, #FFFFFF)`,
          }}
        ></div>
        <div
          className={style["card-content"]}
        >
          {props.icon && (
            <img src={`${import.meta.env.VITE_BASEPATH}usecaseIcons/${props.icon}`} width={80} height={80} />
          )}
          <h3>{props.name}</h3>
        </div>
        {props.isComingSoon === 1 && <span>Coming soon</span>}
      </Card>
    </Link>
  );
}

export default UseCaseCard;
