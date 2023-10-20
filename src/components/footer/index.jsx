import logo from '../../assets/kore.ai.svg';
import style from './index.module.sass';
function Footer(props) {
  return (
    <footer className={style.footer} style={props.style}>
      <img src={logo} alt="kore.ai" width={100} height={20}/>
      <span>v R.1.0.0</span>
    </footer>
  );
}

export default Footer;