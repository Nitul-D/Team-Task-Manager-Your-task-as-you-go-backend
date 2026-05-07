import express from "express";
import { connectDB } from "./lib/database.js";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import taskRoutes from "./routes/task.route.js";
import progressRoutes from "./routes/progress.route.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

//Middleware
app.use(express.json());
app.use(clerkMiddleware());

//routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/progress", progressRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});