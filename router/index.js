import express from "express";
import userController from "../controllers/userController.js";
import menuController from "../controllers/menuController.js";
import { upload } from "../middleware/upload.js";

const { register, listUserByid, edit, listUserByPhone } = userController;
const { addMenu, listMenu } = menuController;
const router = express.Router();

router.post("/register", register);
router.post("/login", listUserByPhone);
router.get("/user/:id", listUserByid);
router.put("/edit/:id", edit);

router.get("/menu", listMenu);
router.post("/add", upload, addMenu);

export default router;
