import * as cardRepository from "../repositories/cardRepository.js";
import { Card } from "@prisma/client";
import cryptr from "cryptr";

export async function createCard(cardInfo: Card) {
  const cryptrInstance = new cryptr(process.env.SECRET_KEY || "secret");
  cardInfo.pin = cryptrInstance.encrypt(cardInfo.pin);
  return await cardRepository.create(cardInfo);
}

export async function findCards(userId: number) {
  const cards = await cardRepository.findByUserId(userId);
  const cryptrInstance = new cryptr(process.env.SECRET_KEY || "secret");
  return cards.map((card: Card) => {
    card.pin = cryptrInstance.decrypt(card.pin);
    return card;
  });
}

export async function findCard(id: number) {
  const card = await cardRepository.findById(id);
  if (!card) {
    return null;
  }
  const cryptrInstance = new cryptr(process.env.SECRET_KEY || "secret");
  card.pin = cryptrInstance.decrypt(card.pin);
  return card;
}

export async function deleteCard(id: number) {
  return await cardRepository.deleteById(id);
}
