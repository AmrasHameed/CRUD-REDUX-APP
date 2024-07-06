import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { logoutUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosInstance.post("users/logout");
      dispatch(logoutUser());
      navigate("/");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error || err.response.data);
      }
    }
  };
  return (
    <div className="flex justify-between items-center p-2.5 bg-gray-800 rounded-md shadow-lg">
    <ToastContainer />
      <h1 className="font-bold px-10 text-white text-3xl font-mono">CRUDAPP</h1>
      <div className="flex justify-end items-center w-full space-x-6">
        <ul className="flex items-center space-x-6 m-0 p-0">
          <li className="my-5 p-2.5 font-light font-lucida text-lg text-gray-300 hover:text-gray-500">
            <Link to={"/home"}>Home</Link>
          </li>
          <li className="my-5 p-2.5 font-light font-lucida text-lg text-gray-300 hover:text-gray-500">
            <Link to={"/userProfile"}>User Profile</Link>
          </li>
          <li className="my-5 p-1 text-lg">
            <button
              className="px-2.5 py-1 text-gray-300 bg-gray-700 rounded-full hover:text-white hover:bg-gray-600 "
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
          <li className="my-5 p-1 text-lg">
            {userInfo && (
              <div className="w-11 h-11 bg-white rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:5000/uploads/${encodeURIComponent(
                    userInfo.image
                  )}`}
                />
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
