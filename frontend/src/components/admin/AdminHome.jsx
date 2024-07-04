import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/adminSlice";
import Swal from "sweetalert2";
import 'animate.css'

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("admin/getUsers");
        setUsers(res.data.users);
        setFilterUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [deleted]);
  useEffect(() => {
    const filterUser = users.filter((user) => {
      const regex = new RegExp(searchText, "i");
      return regex.test(user.name);
    });
    setFilterUsers(filterUser);
  }, [searchText, users]);
  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
      text: 'Do you really want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1e1e1e', 
      color: '#ffffff',
      iconColor: '#f39c12', 
      buttonsStyling: true, 
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
      });

      if (result.isConfirmed) {
        console.log(userInfo)
        const res = await axiosInstance.delete(`admin/deleteUser/${userId}`);
        if(userInfo) {
          if (res.data.userId === userInfo._id) {
            dispatch(logout());
          }
        }
        setDeleted(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("User is not Deleted");
      console.log(error);
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="pt-3 w-[90%] flex justify-center mx-auto">
        <input
          className="w-[90%] py-2.5 border-2 border-t-black border-b-black rounded-l-lg shadow-lg"
          type="text"
          placeholder="  Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="px-5 py-2.5 border-2 border-t-black border-b-black rounded-r-lg bg-gray-700 font-bold text-white shadow-lg"
          onClick={() => {
            const filterUser = users.filter((user) => {
              const regex = new RegExp(searchText, "i");
              return regex.test(user.name);
            });
            setFilterUsers(filterUser);
          }}
        >
          Search
        </button>
      </div>
      {users.length === 0 ? (
        <h1 className="flex justify-center items-center text-white text-2xl pt-3 mt-7">
          User List is Empty
        </h1>
      ) : (
        <div className="flex justify-center items-center">
          <div className="relative overflow-x-auto shadow-sm sm:rounded-lg border-2 shadow-white mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
              <thead className="text-xs text-center uppercase bg-gray-700 text-gray-400 rounded-lg">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-16 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-16 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-16 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-center font-medium whitespace-nowrap text-white">
                {filterUsers.map((user) => {
                  return (
                    <tr
                      key={user._id}
                      className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-900"
                    >
                      <td scope="row" className="px-16 py-4 ">
                        <div className="w-11 h-11 bg-white rounded-full overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={`http://localhost:5000/uploads/${encodeURIComponent(
                              user.image
                            )}`}
                          />
                        </div>
                      </td>
                      <td scope="row" className="px-16 py-4 ">
                        {user.name}
                      </td>
                      <td className="px-16 py-4">{user.email}</td>
                      <td className="px-16 py-4">
                        <Link to={`/update/${user._id}`}>
                          <button className="font-medium dark:text-blue-500 hover:underline mx-1 px-1">
                            Update
                          </button>
                        </Link>
                        {!user.isAdmin && (
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="font-medium dark:text-red-500 hover:underline mx-1 px-1"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHome;
