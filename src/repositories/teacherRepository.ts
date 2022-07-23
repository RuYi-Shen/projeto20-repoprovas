import client from "../database.js";
import { Teacher } from "@prisma/client";

export async function create(teacherInfo: Teacher) {
  return await client.teacher.create({
    data: teacherInfo,
  });
}

export async function findById(id: number) {
  return await client.teacher.findUnique({
    where: {
      id,
    },
  });
}

export async function findAll() {
  return await client.teacher.findMany();
}

export async function deleteById(id: number) {
  return await client.teacher.delete({
    where: {
      id,
    },
  });
}
