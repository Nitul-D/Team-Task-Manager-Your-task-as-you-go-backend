export const checkAdmin = async (req, res) => {
    try {
        res.status(200).json({ admin: true});
    } catch (error) {
        console.error("Error in checking admin:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};