import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body; //clerk sends these details in the request body after successful authentication

    //check if user exists in DB, if not create a new user
    const user = await User.findOne({ clerkId: id });

    // If user doesn't exist, create a new user
    if (!user) {
      // Create a new user Signup
      await User.create({
        clerkId: id,
        username: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    res.status(200).json({ success: true, message: "User authenticated successfully" });
  } catch (error) {
    console.error("Error in auth callback:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
