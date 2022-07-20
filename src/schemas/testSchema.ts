import Joi from "joi";
import { Test } from "@prisma/client";

type TestSchema = Partial<Test> & { disciplineId: number; teacherId: number };

export const createTestInfo = Joi.object<TestSchema>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  categoryId: Joi.number().required(),
  disciplineId: Joi.number().required(),
  teacherId: Joi.number().required(),
});
