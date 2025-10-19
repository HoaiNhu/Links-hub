import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "@/lib/type";

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: String,
  icon: String,
  color: {
    type: String,
    default: "#3b82f6", // blue-500
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
