import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../multer.js";
import { addUser, adminLogin, deleteUser, getSingleUser, getUsers, logoutAdmin, updateUser } from "../controllers/adminController.js";

const router = express.Router();

router.post('/login', adminLogin);
router.get('/getUsers',protect, getUsers);
router.post('/logout', logoutAdmin);
router.delete('/deleteUser/:id',protect,  deleteUser);
router.get('/getSingleUser/:id',protect, getSingleUser);
router.post('/addUser',protect, upload.single('image'), addUser);
router.post('/updateUser/:id',protect,upload.single('image'), updateUser)

export default router;