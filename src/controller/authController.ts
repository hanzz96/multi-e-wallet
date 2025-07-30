import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { responseMessage, responsePayload } from "../utils/response";
import { AppError } from "../utils/appError";

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });
};

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res
                .status(400)
                .json({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(200).json(responseMessage("User created successfully"));
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            next(new AppError('Invalid credentials', 401));
        }

        return responsePayload(res, 200, {
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            },
        });
    } catch (error) {
        console.log(error,'error woi')
        next(error);
    }
};

export const getProfile = async (
    req: Request & { user?: User },
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findByPk(req.user?.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
        next(error);
    }
};
