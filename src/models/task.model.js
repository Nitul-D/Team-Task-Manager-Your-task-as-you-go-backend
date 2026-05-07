import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedBy: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["todo", "halfway", "completed"],
      default: "todo",
    },

    dDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;