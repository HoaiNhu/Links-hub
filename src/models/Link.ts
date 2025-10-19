import mongoose, { Schema, Model } from "mongoose";
import { ILink } from "@/lib/type";

const LinkSchema = new Schema<ILink>({
  url: {
    type: String,
    required: [true, "URL is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: String,
  image: String,
  favicon: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  views: {
    type: Number,
    default: 0,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: Date,
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Index để tìm kiếm nhanh hơn
LinkSchema.index({ status: 1, createdAt: -1 });
LinkSchema.index({ category: 1 });

const Link: Model<ILink> =
  mongoose.models.Link || mongoose.model<ILink>("Link", LinkSchema);

export default Link;
