import { Router } from "express";
import authRouter from "./authRouter.js";
import testRouter from "./testRouter.js";
import categoryRouter from "./categoryRouter.js";

const router = Router();
router.use( authRouter );
router.use("/tests", testRouter);
router.use("/categories", categoryRouter);

export default router;
