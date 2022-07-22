import client from "../database.js";
import { Category } from "@prisma/client";

export async function create(categoryInfo: Category) {
  return await client.category.create({
    data: categoryInfo,
  });
}

export async function findById(id: number) {
  return await client.category.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteById(id: number) {
  return await client.category.delete({
    where: {
      id,
    },
  });
}
