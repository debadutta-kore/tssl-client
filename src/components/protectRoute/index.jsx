import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectRoute = (props) =>{
  const isLogin = useSelector(state=>state.auth.isLogin);
  return isLogin ? props.children : <Navigate to="/auth/check" replace={true}/>
}
export default ProtectRoute