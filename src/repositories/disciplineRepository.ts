import client from "../database.js";
import { Discipline } from "@prisma/client";

export async function create(disciplineInfo: Discipline) {
  return await client.discipline.create({
    data: disciplineInfo,
  });
}

export async function findById(id: number) {
  return await client.discipline.findUnique({
    where: {
      id,
    },
  });
}

export async function findByTerm(termId: number) {
  return await client.discipline.findMany({
    where: {
      termId,
    },
  });
}

export async function deleteById(id: number) {
  return await client.discipline.delete({
    where: {
      id,
    },
  });
}
