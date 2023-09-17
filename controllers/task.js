import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

// To add new task
export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({ title, description, user: req.user });

        res.status(201).json({
            success: true,
            message: "Task is created successfully"
        })
    } catch (error) {
        next(error);
    }
}

// To get all tasks
export const getTask = async (req, res, next) => {
    try {
        const userid = req.user._id;
        console.log(userid)

        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}

// To update task status
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task not found", 404));

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Updated"
        })
    } catch (error) {
        next(error);
    }
}

// To update task status
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task not found", 404));

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        next(error);
    }
}