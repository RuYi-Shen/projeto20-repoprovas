import { Router } from "express";
import { createUserInfo, createSessionInfo } from "../schemas/authSchema.js";
import { validateSchema, validateToken } from "../middlewares/validationMiddleware.js";
import { validateEmail , validatePassword } from "../middlewares/authMiddleware.js";
import { createUser , createSession, endSession } from "../controllers/authController.js";

const authRouter = Router();
authRouter.post("/sign-up", validateSchema(createUserInfo), validateEmail, createUser);
authRouter.post("/sign-in", validateSchema(createSessionInfo), validatePassword, createSession);
authRouter.post("/sign-out", validateToken, endSession);

export default authRouter;
