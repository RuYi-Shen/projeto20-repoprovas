import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
  const testInfo = req.body;
  testInfo.teacherDisciplineId = res.locals.teacherDiscipline.id;
  delete testInfo.teacherId;
  delete testInfo.disciplineId;
  await testService.createTest(testInfo);
  res.sendStatus(201);
}

export async function findCardsByDiscipline(req: Request, res: Response) {
  const { id } = req.params;
  const card = await testService.findCardsByDiscipline(+id);
  res.json(card);
}

export async function findTestsByTeacher(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const cards = await testService.findTestsByTeacher(userId);
  res.json(cards);
}

export async function deleteTest(req: Request, res: Response) {
  const { id } = req.params;
  await testService.deleteTest(+id);
  res.sendStatus(204);
}
