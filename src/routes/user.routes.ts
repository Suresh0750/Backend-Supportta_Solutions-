import express from "express";
import { userController } from "@/DIP/user.dip"; 
import { loginValidator } from "@/middleware/validators/user/loginValidators";
import { signupValidator } from "@/middleware/validators/user/signupValidators";
import { upload } from "@/middleware/multer";
import authenticateToken from "@/middleware/authenticateToken";
import { Role } from "@/utils/constants";
import { authorizeRole } from "@/middleware/roleMiddleware";

const userRouter = express.Router()


userRouter.post('/login',loginValidator,userController.userLogin.bind(userController))
userRouter.post('/signup',upload.single('profilePhoto'),signupValidator,userController.userSignup.bind(userController))
userRouter.patch('/toggle-block/:blockUserId',authenticateToken,authorizeRole([Role.User]),userController.toggleBlockUser.bind(userController))

export default userRouter