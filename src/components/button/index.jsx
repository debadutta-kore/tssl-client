import style from "./index.module.sass";
function Button({children, type, isLoading, className, ...props}) {
  const classes = [];
  if (className) {
    classes.push(style["btn"], className);
  } else {
    classes.push(style["btn"]);
  }
  if (isLoading) {
    classes.push(style["loading-button"]);
  }
  
  return (
    <button
      className={classes.join(" ")}
      type={type || "button"}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={style["dot"]}></span>
          <span className={style["dot"]}></span>
          <span className={style["dot"]}></span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
export default Button;
