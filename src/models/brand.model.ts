import { Schema, model, Document } from 'mongoose';

export interface IBrand extends Document {
  brandName: string;
  brandLogo?: Express.Multer.File | string;
  categories: string[];
}

const brandSchema = new Schema<IBrand>({
  brandName: { type: String, required: true, unique: true,trim:true },
  brandLogo: { type: String, required: true, trim:true},
  categories: [{ type: String, required: true }]
}, { timestamps: true });

export default model<IBrand>('Brand', brandSchema);