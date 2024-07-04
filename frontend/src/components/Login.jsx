import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { setCredentials } from "../slices/userSlice";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Minimum length of 6 characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const res = await axiosInstance.post("/users/auth", { email, password });
      dispatch(setCredentials(res.data));
      navigate("/home");
      toast.success("User Logged in Successfully");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error || err.response.data);
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <ToastContainer />
      <div className="max-w-md w-full mx-auto my-5 bg-gray-800 p-8 rounded-md border-2 shadow-sm shadow-white">
        <h2 className="text-2xl font-bold text-center text-gray-300 mb-8">
          User Login
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Email:
            </label>
            <input
              type="text"
              className="w-full px-3 py-1 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              className="w-full px-3 py-1 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="m-2 p-2 text-center">
          <span className="text-white">
            Don&apos;t have an account?
            <Link to={"/signup"}>
              <button className="font-medium dark:text-blue-500 hover:underline mx-1 px-1">
                Sign up
              </button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
