import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user.isAdmin) {
      if (user && (await user.matchPassword(password))) {
        const token = generateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin,
          token,
        });
      } else {
        return res.status(401).json({ error: "Invalid Email or Password " });
      }
    } else {
      return res.status(401).json({ error: "User is not an Admin" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User Logged Out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.json({ message: "User Deleted successfully", userId });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      console.log("User Already Exist");
      return res.status(409).json({ error: "User alredy exist" });
    }
    const image = req.file ? req.file.filename : "";
    const user = await User.create({
      name,
      email,
      password,
      image,
    });

    if (user) {
      return res.status(201).json({
        message: "User Added Successfully",
      });
    } else {
      return res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.file && req.file.filename) {
        user.image = req.file.filename;
      }
      await user.save();
      return res.status(200).json({
        message: "User Updated Successfully",
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  adminLogin,
  getUsers,
  logoutAdmin,
  deleteUser,
  addUser,
  getSingleUser,
  updateUser,
};
