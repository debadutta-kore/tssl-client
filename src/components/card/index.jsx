import style from "./index.module.sass";
function Card({children, className, ...props}){
    const classes = [style.card];
    if(className) {
        classes.push(className);
    }
    return <div className={classes.join(' ')} {...props}>
        {children}
    </div>
}
export default Card;