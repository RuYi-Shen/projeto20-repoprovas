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

export async function findTests(req: Request, res: Response) {
  const { groupBy } = req.query;
  if (groupBy === "teachers") {
    let tests = await testService.findTestsByTeacher();
    res.json(tests);
  }
  else { 
    let tests = await testService.findTestsByDiscipline();
    res.json(tests);
  }
}

export async function deleteTest(req: Request, res: Response) {
  const { id } = req.params;
  await testService.deleteTest(+id);
  res.sendStatus(204);
}
