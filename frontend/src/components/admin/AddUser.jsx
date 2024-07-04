import { useState } from "react";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !image
    ) {
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
    if (password !== confirmPassword) {
      toast.error("Passwords do no match");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        await axiosInstance.post("admin/addUser/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/adminHome");
        toast.success("User Created Successfully");
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.error || err.response.data);
        }
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  return (
    <div>
      <AdminHeader />
      <div className="max-w-md mx-auto my-5 text-white bg-gray-800 p-8 rounded-md border-2 shadow-sm shadow-white">
        <h2 className="text-2xl font-bold text-center  mb-1">Add User</h2>
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
              type="email"
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

          <div>
            <label className="block  font-medium mb-2">Password:</label>
            <input
              type="password"
              className="w-full px-3 py-1 bg-gray-700  border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Confirm Password:</label>
            <input
              type="password"
              className="w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          {imagePreview && (
            <div className="mt-4 max-w-36 mx-auto">
              <img
                src={imagePreview}
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
    </div>
  );
};

export default AddUser;
