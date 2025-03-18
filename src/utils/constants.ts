import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT!

export const MONGO_URL : string = process.env.MONGO_URL!

export const JWT_SECRET : string =process.env.JWT_SECRET!

export const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;


// * cloudinary setup project

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!


export enum Role {
    User = 'User'
}