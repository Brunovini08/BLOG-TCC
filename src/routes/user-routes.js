import {Router} from "express";
import userController from "../controllers/user-controller.js";
import auth from "../middlewares/auth.js";

const router = Router()

router.post("/login", auth, userController.login)
router.post("/register", userController.register)

export default router