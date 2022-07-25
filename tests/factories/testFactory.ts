import prisma from "../../src/database.js";
import { faker } from "@faker-js/faker";

export async function insertSampleTests(numberOfTests: number = 10) {
  for (let i = 0; i < numberOfTests; i++) {
    const newTest = {
      name: faker.name.firstName(),
      pdfUrl: faker.internet.url(),
      categoryId: Math.floor(Math.random() * 3) + 1,
      teacherDisciplineId: Math.floor(Math.random() * 6) + 1,
    };
    await prisma.test.create({
      data: newTest,
    });
  }
}
