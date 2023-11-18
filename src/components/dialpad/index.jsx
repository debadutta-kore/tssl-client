import DialPadButton from "../button/dialpadButton";
import style from './index.module.sass';

const keypadButtonSequence = ['1','2','3','4','5','6','7','8','9','*','0','#'];

function DialPad({onKeyPress}) {
  const onPressKeyHandler = (key,event)=>{
    event.target.classList.add(style['active']);
    setTimeout(()=>{
      event.target.classList.remove(style['active']);
    },200);
    if(onKeyPress) {
      onKeyPress(key);
    }
  }
  return (
    <div className={style['dialpad']}>
      {keypadButtonSequence.map((key, index) => (
        <DialPadButton key={'dewas'+index} className={style['dialpad-button']} onClick={onPressKeyHandler.bind(null, key)}>{key}</DialPadButton>
      ))}
    </div>
  );
}
export default DialPad;
