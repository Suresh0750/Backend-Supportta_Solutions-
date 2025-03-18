import { Types } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    profilePhoto?: Express.Multer.File | string;
    blockedUsers: Types.ObjectId[]; 
  }