import Task from "../models/task.model.js";

export const getProgress = async (req, res) => {
  try {
    let tasks;
    const currentUserId = req.auth.userId;
    const currentUserEmail = req.auth.sessionClaims?.email;
    const isAdmin = process.env.ADMIN_EMAILS.split(",").includes(currentUserEmail);

    if (isAdmin) {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({
        assignedTo: currentUserId,
      });
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;
    const pendingTasks = tasks.filter((task) => task.status !== "completed").length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.status(200).json({ success: true, totalTasks, completedTasks, pendingTasks, progress});
  } catch (error) {
    console.error("Error in getting progress:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
