import { useSelector } from "react-redux";

function ValidateRouteWithRole(props){
    const role = useSelector((state)=>state.auth.role);
    const roles = props.role || ['admin','user'];
    return roles.includes(role) ? <props.Component/> : <h1>404 error path not found</h1>
}
export default ValidateRouteWithRole;