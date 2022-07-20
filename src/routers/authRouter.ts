import { Router } from "express";
import { createUserInfo, createSessionInfo } from "../schemas/authSchema.js";
import { validateSchema, validateToken } from "../middlewares/validationMiddleware.js";
import { validateEmail , validatePassword } from "../middlewares/authMiddleware.js";
import { createUser , createSession, endSession } from "../controllers/authController.js";

const authRouter = Router();
authRouter.post("/signup", validateSchema(createUserInfo), validateEmail, createUser);
authRouter.post("/signin", validateSchema(createSessionInfo), validatePassword, createSession);
authRouter.post("/signout", validateToken, endSession);

export default authRouter;