import { useSelector } from "react-redux";
import { Navigate, useLocation} from "react-router-dom";

const ProtectRoute = (props) =>{
  const isLogin = useSelector(state=>state.auth.isLogin);
  const location = useLocation();

  return isLogin ? props.children : <Navigate to="/auth/check" replace={true} state={{from: location}}/>
}

export default ProtectRoute