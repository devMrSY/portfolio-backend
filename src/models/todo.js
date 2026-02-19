import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "inprogress", "complete", "abort"],
      default: "pending",
    },
    isArchived: { type: Boolean, default: false },
    archivedAt: { type: Date, default: null },
  },
  {
    collection: "todo",
    timestamps: true,
  }
);

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);