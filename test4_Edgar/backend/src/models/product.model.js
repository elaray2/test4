import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

const productSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    date: {type: Date, default: Date.now },
    user: {type: mongoose.Types.ObjectId, ref: "User"},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);


