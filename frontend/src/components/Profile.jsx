import { useSelector } from "react-redux";
import Header from "./Header";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <Header />
      <div>
        <div className="flex flex-col items-center max-w-md mx-auto my-5 text-white bg-gray-800 p-8 rounded-md border-2 shadow-sm shadow-white">
          <div>
            <img
              className="w-52 rounded-full border-2 border-white"
              src={`http://localhost:5000/uploads/${encodeURIComponent(
                userInfo.image
              )}`}
              alt="Profile Image"
            />
          </div>
          <div className="bg-gray-900 p-2 m-2 w-[110%] h-52 flex flex-col justify-center rounded-lg border-2 border-white">
            <h1 className="p-1 m-1 text-xl">
              Name: {userInfo.name ? userInfo.name : "Name"}
            </h1>
            <h1 className="p-1 m-1 text-xl mb-4">
              Email: {userInfo.email ? userInfo.email : "Email"}
            </h1>
            <Link
              className="px-2.5 py-3 text-gray-300 text-center bg-gray-700 rounded-full hover:text-white hover:bg-gray-600 "
              to={"/editProfile"}
            >
              <button>Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
