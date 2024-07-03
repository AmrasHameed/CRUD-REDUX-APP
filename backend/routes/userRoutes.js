import express from "express";
import { authUser,registerUser, logoutUser, updateUserProfile  } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../multer.js";

const router = express.Router();

router.post('/',upload.single('image'), registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/profile',protect,upload.single('image'), updateUserProfile)

export default router;
