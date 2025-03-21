
import { IUser } from "../models/user.model"
import UserRepository from "../repositories/entities/userRepository/user.repository"
import { AuthenticationError, AuthorizationError, NotFoundError, ValidationError } from "../shared/CustomError"
import { uploadToCloudinary } from "../utils/cloudinaryHelper"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

const ObjectId = Types.ObjectId
export default class UserServices{
    private userRepository : UserRepository
    constructor (userRepository:UserRepository){
        this.userRepository = userRepository
    }

    //*  Hash data (like password)
    protected async hashPassword(data: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(data, salt);
    }

    //* Compare raw data with hashed data
    protected async comparePassword(data: string, hashedData: string): Promise<boolean> {
        return await bcrypt.compare(data, hashedData);
    }

    // * user login logic
    async userLogin(email:string,password:string) : Promise<IUser>{
        try {

        const findUser:IUser | null = await this.userRepository.findByEmail(email)
        if(!findUser){
            throw new AuthenticationError('Email Not Found')
        }
        
        const isCheckPassword = await this.comparePassword(password,findUser.password)

        if(!isCheckPassword){
            throw new AuthenticationError('Password Invalid')
        }
        return findUser
        } catch (error:unknown) {
            console.error(error)
            throw error
        }
    }

    // * user sign up logic
    async userSignup(data:Omit<IUser,'blockedUsers'>): Promise<any>{
        try {
            const existUser = await this.userRepository.findByEmail(data?.email)
            if(existUser) throw new ValidationError('User already exists')
            
            let profilePhoto;
            if (data.profilePhoto) {
                profilePhoto = await uploadToCloudinary(data?.profilePhoto as  Express.Multer.File) ;
            }
            data.password = await this.hashPassword(data.password)
            return await this.userRepository.createData('UserModel',{...data,profilePhoto})
        } catch (error:unknown) {
            console.error(error)
            throw error
        }
    }
    async toggleBlockUser(userId: string, targetUserId: string): Promise<IUser> {
        try{
        
            const user = await this.userRepository.findById('UserModel',userId)

            if (!user) throw new NotFoundError('User not found');
            const targetObjectId = new mongoose.Types.ObjectId(targetUserId);
            const isBlocked = user.blockedUsers.includes(targetObjectId);
        
            if (isBlocked) {
            // * Unblock user 
            user.blockedUsers = user.blockedUsers.filter(id => id.toString() !== targetUserId);
            } else {
            // * Block user 
            user.blockedUsers.push(targetObjectId);
            }
        
            await this.userRepository.updateById('UserModel',userId,user)
            return user

        } catch (error:unknown) {
            console.error(error)
            throw error
        }
      }
      async editUser(data: Omit<IUser,'password'>, userId: string,file:Express.Multer.File | undefined): Promise<IUser | null> {
        try {
            if (data?._id !== userId) throw new AuthorizationError("You don't have access to update this Details.");
            
            if(file){
                console.log('file',file)
                data.profilePhoto = await uploadToCloudinary(file as  Express.Multer.File) ;
            }
            const existUser = await this.userRepository.findById('UserModel',userId)
            if(!existUser) throw new NotFoundError(`User doesn't exist`) 
            return await this.userRepository.updateById('UserModel', userId, data);
        } catch (error: unknown) {
            console.error("Error in editUser:", error);
            throw error;
        }
    }
    
    async deleteUser(userId: string, requestingUserId: string): Promise<IUser | null> {
        try {
            if (userId !== requestingUserId) throw new AuthorizationError("You don't have access to delete this Details.");
            
            const existUser = await this.userRepository.findById('UserModel',userId)
            if(!existUser) throw new NotFoundError(`User doesn't exist`)
            return await this.userRepository.deleteById('UserModel', userId);
        } catch (error: unknown) {
            console.error("Error in deleteUser:", error);
            throw error;
        }
    }
    
}   