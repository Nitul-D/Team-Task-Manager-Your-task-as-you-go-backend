import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
    try {
        const newTask = await Task.create({
          ...req.body,
          assignedBy: req.auth.userId,
        });

        const task = await Task.findById(newTask._id).populate("projectId").populate("assignedTo", "username imageUrl");
        res.status(201).json({ success: true, task });
    } catch (error) {
        console.error("Error in creating task:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("projectId").populate("assignedTo", "username imageUrl");
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error("Error in getting all tasks:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("projectId").populate("assignedTo", "username imageUrl");;
        res.status(200).json({ success: true, updated });
    } catch (error) {
        console.error("Error in updating task:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Task Deleted Successfully" });
    } catch (error) {
        console.error("Error in deleting task:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
