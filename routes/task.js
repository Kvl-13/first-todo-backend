import express from "express";
import { newTask, getTask, updateTask, deleteTask } from "../controllers/task.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

// To add new task
router.post("/new", isAuth, newTask);

// To get all task
router.get("/gettask", isAuth, getTask);

// To delete or update task
router.route("/:id").put(isAuth, updateTask).delete(isAuth, deleteTask);

export default router;