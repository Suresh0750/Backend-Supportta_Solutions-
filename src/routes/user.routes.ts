import express from "express";
import { userController } from "@/DIP/user.dip"; 
import { loginValidator } from "@/middleware/validators/user/loginValidators";
import { signupValidator } from "@/middleware/validators/user/signupValidators";
import { upload } from "@/middleware/multer";

const userRouter = express.Router()


userRouter.post('/login',loginValidator,userController.userLogin.bind(userController))
userRouter.post('/signup',upload.single('profilePhoto'),signupValidator,userController.userSignup.bind(userController))
userRouter.patch('/toggle-block/:blockUserId',userController.toggleBlockUser.bind(userController))

export default userRouter