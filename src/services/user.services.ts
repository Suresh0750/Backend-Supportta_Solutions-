
import { IUser } from "@/models/user.model"
import UserRepository from "@/repositories/entities/userRepository/user.repository"
import { AuthenticationError, ValidationError } from "@/shared/CustomError"
import { uploadToCloudinary } from "@/utils/cloudinaryHelper"
import bcrypt from "node_modules/bcryptjs"

export default class UserServices{
    private userRepository : UserRepository
    constructor (userRepository:UserRepository){
        this.userRepository = userRepository
    }

    //*  Hash data (like password)
    protected async hashData(data: string): Promise<string> {
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
        
        const isCheckPassword = await this.comparePassword(findUser.password,password)

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
                console.log(profilePhoto,'profilePhoto')
            }
            return await this.userRepository.createData('UserModel',{...data,profilePhoto})
        } catch (error:unknown) {
            console.error(error)
            throw error
        }
    }
}   