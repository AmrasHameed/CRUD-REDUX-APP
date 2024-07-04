import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivate = () => {
    const { adminInfo, isAdmin } = useSelector((state) => state.admin);
    return adminInfo && isAdmin ? <Outlet /> : <Navigate to={"/admin"} replace />;
  
}

export default AdminPrivate