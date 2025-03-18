import { Schema, model, Document } from 'mongoose';

interface IBrand extends Document {
  brandName: string;
  brandLogo?: string;
  categories: string[];
}

const brandSchema = new Schema<IBrand>({
  brandName: { type: String, required: true, unique: true },
  brandLogo: { type: String },
  categories: [{ type: String, required: true }]
}, { timestamps: true });

brandSchema.index({ brandName: 1 });
brandSchema.index({ categories: 1 });

export default model<IBrand>('Brand', brandSchema);