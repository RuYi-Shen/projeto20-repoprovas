import { Router } from "express";
import authRouter from "./authRouter.js";
import testRouter from "./testRouter.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/test", testRouter);

export default router;
