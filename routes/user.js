import express from "express";
import { register, login, getMyDetail, logout } from "../controllers/user.js";
import { isAuth } from "../middlewares/auth.js";


const router = express.Router();

// To get all users
router.get("/me", isAuth, getMyDetail);

// For registration 
router.post("/new", register);

// For login
router.post("/login", login);

// For logout
router.get("/logout", logout);




// router.route("/userid/:id")
//     .get(getUser)
//     .put(updateUser)
//     .delete(deleteUser);

// upper or lower both are same 

// To get user details by id
// router.get("/userid/:id", getUser);

// To update user by using its id
// router.put("/userid/:id", updateUser);

// To delete user by using its id
// router.delete("/userid/:id", deleteUser);

export default router;