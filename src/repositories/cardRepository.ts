import client from "../database.js";
import { Card } from "@prisma/client";

export async function create(cardInfo: Card) {
  return await client.card.create({
    data: cardInfo,
  });
}

export async function findByLabel(label: string) {
  return await client.card.findMany({
    where: {
      label,
    },
  });
}

export async function findByUserId(userId: number) {
  return await client.card.findMany({
    where: {
      userId,
    },
  });
}

export async function findById(id: number) {
  return await client.card.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteById(id: number) {
  return await client.card.delete({
    where: {
      id,
    },
  });
}
