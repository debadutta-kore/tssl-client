import style from './index.module.sass';
function Button(props){
    return <button 
    className={props.className?`${style['btn']} ${props.className}`: style['btn']}
    type={props.type?props.type:'button'}
    style={props.style}
    onClick={props.onClick}
    disabled={props.disabled}
    >
        {props.children}
    </button>
}
export default Button;