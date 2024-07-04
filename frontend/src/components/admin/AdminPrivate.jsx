import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "../../slices/adminSlice";

const AdminPrivate = () => {
    const { adminInfo, isAdmin } = useSelector((state) => state.admin);
    const dispatch = useDispatch()
    const admin = localStorage.getItem('adminInfo')
    if(!admin) {
        dispatch(logout())
    }
    return adminInfo && isAdmin ? <Outlet /> : <Navigate to={"/admin"} replace />;
  
}

export default AdminPrivate