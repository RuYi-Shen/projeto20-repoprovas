import { Router } from "express";
import { createTestInfo } from "../schemas/testSchema.js";
import { validateSchema, validateToken, validateLabel, validateId } from "../middlewares/validationMiddleware.js";
import { createCard, findCard, findCards, deleteCard } from "../controllers/cardController.js";
import * as cardRepository from "../repositories/cardRepository.js";

const cardRouter = Router();
cardRouter.post("", validateSchema(createTestInfo), validateToken, validateLabel(cardRepository) , createCard);
cardRouter.get("", validateToken, findCards);
cardRouter.get("/:id", validateToken, validateId(cardRepository), findCard);
cardRouter.delete("/:id", validateToken, validateId(cardRepository), deleteCard);

export default cardRouter;