import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utilitis/features.js"
import ErrorHandler from "../middlewares/error.js";

// For Registration
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User already exists", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });

        setCookie(user, res, "Register successfully", 201);

    } catch (error) {
        next(error);
    }
};

// For Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid email or password", 400));

        const isCompared = await bcrypt.compare(password, user.password);

        if (!isCompared) return next(new ErrorHandler("Wrong email or password", 400));

        setCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const getMyDetail = (req, res, next) => {
    const { user } = req;

    res.status(200).json({
        success: true,
        user
    })
}

export const logout = (req, res, next) => {
    res
        .status(200)
        .cookie("token", "",
            {
                expires: new Date(Date.now()),
                sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
                secure: process.env.NODE_ENV === "Development" ? false : true,
            })
        .json({
            success: true,
            message: "Logout Successfully"
        })
}



