import { Navigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";

const PrivateRoute = () => {
  const { userInfo} = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const user = localStorage.getItem('userInfo')
  if(!user) {
    dispatch(logoutUser())
  }
  return userInfo  ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;
