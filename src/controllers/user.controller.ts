
import UserServices from "@/services/user.services"
import { JwtService } from "@/integration/jwt"
import { NextFunction,Request,Response } from "express"
import { SuccessResponse } from "@/shared/ApiResponse"
import { HttpStatus } from "@/shared/HttpStatusCode"
import { Role } from "@/utils/constants"

export default class UserController{
    private userService : UserServices
    private jwtService :  JwtService
    constructor (userService:UserServices,jwtServices:JwtService){
        this.userService = userService
        this.jwtService = jwtServices
    }
    async userLogin(req:Request,res:Response,next:NextFunction):Promise<void>{
            try {
                const {email,password} = req.body
                const findUser = await this.userService.userLogin(email,password)
                console.log(findUser)
                const accessToken = await this.jwtService.createToken(findUser,Role.User)
                const refreshToken = await this.jwtService.createToken(findUser,Role.User)

                SuccessResponse(res,HttpStatus.Success,'User Successfully verified',findUser,accessToken,refreshToken)
            } catch (error:unknown) {
                console.error(error)
                next(error)
            }
    }
    async userSignup(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const data = {
                ...req.body,
                profilePhoto : req.file
            }
            await this.userService.userSignup(data)
            SuccessResponse(res,HttpStatus.Success,'User Successfully Create Account')
        } catch (error:unknown) {
            console.error(error)
            next(error)
        }
    }
}