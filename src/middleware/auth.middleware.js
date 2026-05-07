import { clerkClient } from "@clerk/express";
import { verifyToken } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if ( !authHeader ) {
            return res.status(401).json({ message: "No Token Provided" });
        }

        const token = authHeader.split(" ")[1];
        const payload = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });

        req.auth = {
            userId: payload.sub,
        };

        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(401).json({ message: "Unauthorized"});
    }
};

export const requireAdmin = async (req, res, next) => {
    try {
        if (!req.auth?.userId) {
            return res.status(401).json( {message: "Unauthorized"});
        }

        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAILS === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({message: "Forbidden: Admins Only"});
        }

        next();
    } catch (error) {
        console.error("Error in requireAdmin middleware:", error);
        return res.status(500).json({message: "Internal Server Error"});
    };
};