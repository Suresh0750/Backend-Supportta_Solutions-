import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  productImage?: string;
  addedBy: Types.ObjectId;
}
const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, ref: 'Brand', required: true },
  productImage: { type: String },
  addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Indexing for faster queries
productSchema.index({ price: 1 });
productSchema.index({ productName: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });

export default model<IProduct>('Product', productSchema);
