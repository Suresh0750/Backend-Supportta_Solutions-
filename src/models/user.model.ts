

import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePhoto?: Express.Multer.File | string ;
  blockedUsers: Types.ObjectId[]; 
}

const userSchema = new Schema<IUser>({  
  username: { type: String, required: true ,trim:true},
  email: { type: String, unique: true, required: true ,trim:true},
  password: { type: String, required: true,trim:true},
  profilePhoto: { type: String ,trim:true},
  blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default model<IUser>('User', userSchema,'users');
