import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt: Date;
}

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt: Date;
}

export interface ILink extends Document {
  _id: Types.ObjectId;
  url: string;
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
  category: Types.ObjectId | ICategory;
  submittedBy: Types.ObjectId | IUser;
  status: "pending" | "approved" | "rejected";
  views: number;
  clicks: number;
  tags: string[];
  createdAt: Date;
  approvedAt?: Date;
  approvedBy?: Types.ObjectId | IUser;
}

export interface LinkMetadata {
  title: string;
  description: string;
  image: string;
  favicon: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}
