import client from "../database.js";
import { Term } from "@prisma/client";

export async function create(termInfo: Term) {
  return await client.term.create({
    data: termInfo,
  });
}

export async function findById(id: number) {
  return await client.term.findUnique({
    where: {
      id,
    },
  });
}

export async function findAll() {
  return await client.term.findMany();
}

export async function deleteById(id: number) {
  return await client.term.delete({
    where: {
      id,
    },
  });
}
