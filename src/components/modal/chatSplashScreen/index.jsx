import Modal from "..";
import style from './index.module.sass'
function ChatSplashScreen(props) {
  return (
    <Modal style={{background: props.theme}}>
      <div className={style['intro-container']}>
        {props.icon && <img src={props.icon} alt="usecase-icon" width={100} height={100} />}
        <h1>{props.name}</h1>
      </div>
    </Modal>
  );
}

export default ChatSplashScreen;
