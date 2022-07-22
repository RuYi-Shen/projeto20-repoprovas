import * as testRepository from "../repositories/testRepository.js";
import { Test } from "@prisma/client";

export async function createTest(testInfo: Test) {
  return await testRepository.create(testInfo);
}

export async function findCardsByDiscipline(userId: number) {

}

export async function findTestsByTeacher(id: number) {

}

export async function deleteTest(id: number) {
  return await testRepository.deleteById(id);
}
