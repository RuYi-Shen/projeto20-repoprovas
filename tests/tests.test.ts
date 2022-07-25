import app from "../src/app.js";
import supertest from "supertest";
//import prisma from "../src/database.js";
import { faker } from "@faker-js/faker";
import { clearAll, insertSampleData } from "../tests/factories/databaseFactory.js"
import { createUser } from "./factories/userFactory.js";
import { insertSampleTests } from "./factories/testFactory.js";

import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();


let token = "";
beforeAll(async () => {
  await clearAll();
  token = await createUser();
  return await insertSampleData();
}, 15000);

beforeEach(async () => {
  await prisma.test.deleteMany({});
});

describe("tests", () => {
  it("should return 201 when create with valid token", async () => {
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    const newTest = {
      name: faker.name.firstName(),
      pdfUrl: faker.internet.url(),
      categoryId: Math.floor(Math.random() * 3) + 1,
      teacherId: randomNumber,
      disciplineId: randomNumber * (Math.floor(Math.random() * 3) + 1),
    };
    console.log({newTest});
    const response = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(newTest);
    expect(response.status).toBe(201);
    const testFromDb = await prisma.test.findFirst({
      where: {
        name: newTest.name,
        pdfUrl: newTest.pdfUrl,
        categoryId: newTest.categoryId,
      },
    });
    expect(testFromDb).toBeDefined();
  });
  it("should return 500 when create with invalid token ", async () => {
    const invalidToken = faker.datatype.uuid();
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    const newTest = {
      name: faker.name.firstName(),
      pdfUrl: faker.internet.url(),
      categoryId: Math.floor(Math.random() * 3) + 1,
      teacherId: randomNumber,
      disciplineId: randomNumber * (Math.floor(Math.random() * 3) + 1),
    };
    const response = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(newTest);
    expect(response.status).toBe(500);
  });
  it("should return 422 when create with invalid test format", async () => {
    const invalidTest = {
      name: faker.name.firstName(),
      pdfUrl: faker.internet.url(),
    };
    const response = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidTest);
    expect(response.status).toBe(422);
  });
  it("should return 200 when request for categories", async () => {
    const response = await supertest(app)
      .get("/categories")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("should return 200 when request for tests by disciplines", async () => {
    await insertSampleTests(20);
    const response = await supertest(app)
      .get("/tests?groupBy=discipline")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("should return 200 when request for tests by teachers", async () => {
    await insertSampleTests(20);
    const response = await supertest(app)
      .get("/tests?groupBy=teacher")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
