import mongoose from "mongoose";

export interface ISettings extends mongoose.Document {
  key: string;
  value: Record<string, unknown>;
  description?: string;
  updatedAt: Date;
}

const SettingsSchema = new mongoose.Schema<ISettings>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
const Settings =
  mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
