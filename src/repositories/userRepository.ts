import client from "../database.js";
import { User } from "@prisma/client";

export async function findById(id: number) {
  return await client.user.findUnique({
    where: {
      id,
    },
  });
}

export async function findByEmail(email: string) {
  return await client.user.findUnique({
    where: {
      email,
    },
  });
}

export async function create(userInfo: User) {
  return await client.user.create({
    data: userInfo,
  });
}