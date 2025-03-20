
import UserServices from "@/services/user.services"
import { JwtService } from "@/integration/jwt"
import { NextFunction,Request,Response } from "express"
import { SuccessResponse } from "@/shared/ApiResponse"
import { HttpStatus } from "@/shared/HttpStatusCode"
import { Role, Token } from "@/utils/constants"
import { AuthorizationError, ValidationError } from "@/shared/CustomError"
import mongoose from "mongoose"
import { JwtPayload } from "jsonwebtoken"
import { AuthenticatedRequest } from "@/shared/CustomeRequest"



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
                const accessToken = await this.jwtService.createToken(findUser,Role.User)
                const refreshToken = await this.jwtService.createRefreshToken(findUser,Role.User)

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
    async toggleBlockUser(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            const targetUserId = req.params.blockUserId; 
            const {user} :any = req.user

            if (!targetUserId) {
                throw new ValidationError('Target user ID is required')
            }

            if(user?._id==targetUserId) throw new AuthorizationError("Forbidden: You cannot perform this action on yourself.")
        
            const updatedUser = await this.userService.toggleBlockUser(user?._id, targetUserId);
            const targetObjectId = new mongoose.Types.ObjectId(targetUserId);
            const isNowBlocked = updatedUser.blockedUsers.includes(targetObjectId);
            const message = isNowBlocked ? 'User blocked successfully' : 'User unblocked successfully';
            SuccessResponse(res,HttpStatus.Success,message)
          } catch (error:unknown) {
            console.error(error)
            next(error);
          }
    }
    async renewAccessToken(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            const refreshToken = req.cookies[Token.RefreshToken]

            if(!refreshToken) throw new ValidationError("Refresh token is required")
            const decoded = await this.jwtService.verifyToken(refreshToken) 
            if(!decoded) throw new AuthorizationError("Invalid token")

            const accessToken = await this.jwtService.createToken(decoded?.user,Role.User)

            SuccessResponse(res,HttpStatus.Success,'User Successfully verified','',accessToken,refreshToken)
        } catch (error:unknown) {
            console.error(error)
            next(error);
          }
    }
}   