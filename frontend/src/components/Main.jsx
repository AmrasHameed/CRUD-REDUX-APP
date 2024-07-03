import { useSelector } from "react-redux";

const Main = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="bg-gray-900 text-white flex justify-center items-center my-36">
      {userInfo && (
        <div className="text-center text-gray-600 text-6xl md:text-8xl lg:text-9xl">
          <h1>
            Hi <span className="text-white">{userInfo.name || ""}</span>
          </h1>
          <h1>Welcome to CRUD-APP</h1>
        </div>
      )}
    </div>
  );
};

export default Main;
