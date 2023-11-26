import {Router} from "express";
import userController from "../controllers/user-controller.js";
import auth from "../middlewares/auth.js"


const router = Router()

router.post("/login", userController.login)
router.post("/register", userController.register)
router.put("/moduser/:id", auth, userController.modUser)
router.get("/getallusers", userController.getAllUsers)
router.get("/getpost/:id", userController.postGetUser)
router.post("/forget-password", userController.forgetPass)
router.put("/resetpassword/:id/:token", userController.resetPass)

export default router