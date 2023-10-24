import style from "./index.module.sass";
function Button(props) {
  const classes = [];
  if (props.className) {
    classes.push(style["btn"], props.className);
  } else {
    classes.push(style["btn"]);
  }
  if (props.isLoading) {
    classes.push(style["loading-button"]);
  }
  
  return (
    <button
      className={classes.join(" ")}
      type={props.type ? props.type : "button"}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.isLoading ? (
        <>
          <span className={style["dot"]}></span>
          <span className={style["dot"]}></span>
          <span className={style["dot"]}></span>
        </>
      ) : (
        props.children
      )}
    </button>
  );
}
export default Button;
