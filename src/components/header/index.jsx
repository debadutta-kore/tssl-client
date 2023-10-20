import style from './index.module.sass';
function Header(props){
    return <header className={style['header']}>
        {props.children}
    </header>
}
export default Header;