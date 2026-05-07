import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            createdBy: req.auth.userId,
        });

        res.status(201).json({ success: true, project});
    } catch (error) {
        console.error("Error in creating project:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, projects });
    } catch (error) {
        console.error("Error in getting all projects:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const updateProject = async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate (
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ success: true, updated });
    } catch (error) {
        console.error("Error in updating project:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Project Deleted Successfully" });
    } catch (error) {
        console.error("Error in deleting project:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};