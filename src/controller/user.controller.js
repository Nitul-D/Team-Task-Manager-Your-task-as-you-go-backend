import User from "../models/user.model.js";

export const getAllUser = async (req, res) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({ clerkId: { $ne: currentUserId } });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getting all the users:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};