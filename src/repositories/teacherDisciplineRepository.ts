import client from "../database.js";
import { TeacherDiscipline } from "@prisma/client";

export async function create(teacherDisciplineInfo: TeacherDiscipline) {
  return await client.teacherDiscipline.create({
    data: teacherDisciplineInfo,
  });
}

export async function findById(id: number) {
  return await client.teacherDiscipline.findUnique({
    where: {
      id,
    },
  });
}

export async function findByDataId({
  teacherId,
  disciplineId,
}: {
  teacherId: number;
  disciplineId: number;
}) {
  return await client.teacherDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });
}

export async function findByDiscipline(disciplineId: number) {
  return await client.teacherDiscipline.findMany({
    where: {
      disciplineId,
    },
  });
}

export async function findByTeacher(teacherId: number) {
  return await client.teacherDiscipline.findMany({
    where: {
      teacherId,
    },
  });
}

export async function findAll() {
  return await client.teacherDiscipline.findMany();
}

export async function deleteById(id: number) {
  return await client.teacherDiscipline.delete({
    where: {
      id,
    },
  });
}
