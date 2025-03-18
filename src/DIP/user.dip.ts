
import UserServices from "@/services/user.services"
import UserRepository from "@/repositories/entities/userRepository/user.repository"
import UserController from "@/controllers/user.controller"
import { JwtService } from "@/integration/jwt"


const userRepository = new UserRepository()
const userService = new UserServices(userRepository)
const jwtService = new JwtService()
const userController = new UserController(userService,jwtService)


export {userController}