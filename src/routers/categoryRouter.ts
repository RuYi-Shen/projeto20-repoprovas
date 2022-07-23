import { Router } from "express";
import { validateToken } from "../middlewares/validationMiddleware.js";
import { findCategories } from "../controllers/categoryController.js";

const categoryRouter = Router();
categoryRouter.get("", validateToken, findCategories);

export default categoryRouter;