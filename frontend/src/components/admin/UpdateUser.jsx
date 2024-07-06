import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader"
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { toast, ToastContainer } from "react-toastify";

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const {id} = useParams()
    useEffect(() => {
      const fetchData = async (userId) => {
        try{
            const {data} = await axiosInstance.get(`admin/getSingleUser/${userId}`)
            setName(data.user.name);
            setImage(data.user.image);
            setEmail(data.user.email);
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.error || err.response.data);
            }
        }
      }
      fetchData(id)
    }, [id]);
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email.trim() || !name.trim()) {
        toast.error("Please fill in all fields");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        imagePreview !== null && formData.append("image", image);
        await axiosInstance.post(`admin/updateUser/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/adminHome");
        toast.success("Profile Updated Successfully");
        console.log("updated");
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.error || err.response.data);
        }
      }
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      console.log(file);
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    };
  
    return (
      <>
        <ToastContainer />
        <AdminHeader/>
        <div className="max-w-md mx-auto my-5 text-white bg-gray-800 p-8 rounded-md border-2 shadow-sm shadow-white">
          <h2 className="text-2xl font-bold text-center  mb-1">Update User</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block  font-medium mb-2">Name:</label>
              <input
                type="text"
                className="w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <label className="block  font-medium mb-2">Email:</label>
              <input
                type="text"
                className="w-full px-3 py-1 bg-gray-700  border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label className="block  font-medium mb-2">Profile Image:</label>
              <input
                type="file"
                className="w-full px-3 py-1 bg-gray-700  border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview ? (
              <div className="mt-4 max-w-36 mx-auto">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full h-auto rounded-md"
                />
              </div>
            ) : (
              <div className="mt-4 max-w-36 mx-auto">
                <img
                  src={`http://localhost:5000/uploads/${encodeURIComponent(
                    image
                  )}`}
                  alt="Image Preview"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
}

export default UpdateUser