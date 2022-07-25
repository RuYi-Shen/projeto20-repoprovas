import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app.js";

export async function createUser() {
  const newUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  await supertest(app).post("/sign-up").send(newUser);
  const { body } = await supertest(app).post("/sign-in").send(newUser);
  console.log(body);
  return body.token;
}
