import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/database.js";
import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
});

describe("authentication", () => {
  it("should return 201 when register valid new user", async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await supertest(app).post("/sign-up").send(newUser);
    expect(response.status).toBe(201);
    const userFromDb = await prisma.user.findUnique({
      where: { email: newUser.email },
    });
    expect(userFromDb).toBeDefined();
  });
  it("should return 401 when register using repeated email", async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await supertest(app).post("/sign-up").send(newUser);

    const response = await supertest(app).post("/sign-up").send(newUser);
    expect(response.status).toBe(401);
  });
  it("should return 401 when login with invalid credentials", async () => {
    const invalidUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response2 = await supertest(app)
      .post("/sign-in")
      .send(invalidUser);
    expect(response2.status).toBe(401);
  });
  it("should return 200 with token when login with valid credentials", async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await supertest(app).post("/sign-up").send(newUser);

    const response = await supertest(app).post("/sign-in").send(newUser);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    const session = await prisma.session.findFirst({
      where: { token: response.body.token },
    });
    expect(session).toBeDefined();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
