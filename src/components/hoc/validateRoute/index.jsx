import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function withRoleValidation(WrappedComponent, roles = ['admin', 'user']) {
    return function ValidRoute(props) {
        const role = useSelector((state) => state.auth.role);
        return roles.includes(role) ? <WrappedComponent {...props} /> : <Navigate to="/home" />
    };
}
export default withRoleValidation;
