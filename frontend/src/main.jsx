import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./components/Profile.jsx";
import EditProfile from "./components/EditProfile.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminHome from "./components/admin/AdminHome.jsx";
import AddUser from "./components/admin/AddUser.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import AdminPrivate from "./components/admin/AdminPrivate.jsx";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<App />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/userProfile" element={<Profile />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/editProfile" element={<EditProfile />} />
      </Route>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="" element={<AdminPrivate />}>
        <Route path="/adminHome" element={<AdminHome />} />
      </Route>
      <Route path="" element={<AdminPrivate />}>
        <Route path="/addUser" element={<AddUser />} />
      </Route>
      <Route path="" element={<AdminPrivate />}>
        <Route path="/update/:id" element={<UpdateUser />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={appRouter} />
      </React.StrictMode>
    </Provider>
  </>
);
