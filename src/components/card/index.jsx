import style from "./index.module.sass";
function Card(props){
    return <div className={props.className?`${style.card} ${props.className}`:style.card} style={props.style}>
        {props.children}
    </div>
}
export default Card;