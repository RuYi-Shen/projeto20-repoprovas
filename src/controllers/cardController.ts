import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const cardInfo = req.body;
  cardInfo.userId = res.locals.user.id;
  await cardService.createCard(cardInfo);
  res.sendStatus(201);
}

export async function findCard(req: Request, res: Response) {
  const { id } = req.params;
  const card = await cardService.findCard(+id);
  res.json(card);
}

export async function findCards(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const cards = await cardService.findCards(userId);
  res.json(cards);
}

export async function deleteCard(req: Request, res: Response) {
  const { id } = req.params;
  await cardService.deleteCard(+id);
  res.sendStatus(204);
}
