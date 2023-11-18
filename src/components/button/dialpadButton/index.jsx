import style from "./index.module.sass";
function DialPadButton({ children, className, type,...props }) {
  return (
    <button
      {...props}
      className={
        className
          ? `${style["dialpad-button"]} ${className}`
          : style["dialpad-button"]
      }
      type={type || 'button'}
    >
      {children}
    </button>
  );
}
export default DialPadButton;
