import client from "../database.js";
import { Test } from "@prisma/client";

export async function create(testInfo: Test) {
  return await client.test.create({
    data: testInfo,
  });
}


export async function findById(id: number) {
  return await client.test.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteById(id: number) {
  return await client.test.delete({
    where: {
      id,
    },
  });
}
