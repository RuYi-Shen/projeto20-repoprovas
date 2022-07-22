import { Router } from "express";
import { createTestInfo } from "../schemas/testSchema.js";
import { validateSchema, validateToken } from "../middlewares/validationMiddleware.js";
import { validateIds } from "../middlewares/testMiddleware.js";
import { createTest } from "../controllers/testController.js";

const testRouter = Router();
testRouter.post("", validateSchema(createTestInfo), validateToken, validateIds , createTest);

export default testRouter;