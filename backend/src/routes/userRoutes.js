import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.route("/login").post(login);
userRoutes.route("/register").post(register);
userRoutes.route("/add_to_activity");
userRoutes.route("/get_activity");

export default userRoutes;
