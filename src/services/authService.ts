import * as userRepository from "../repositories/userRepository.js";
import * as sessionRepository from "../repositories/sessionRepository.js";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function createUser(userInfo: User) {
  userInfo.password = await bcrypt.hash(userInfo.password, 10);
  return await userRepository.create(userInfo);
}

export async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY || "secret");

  return await sessionRepository.create(userId, token);
}

export async function endSession(userId: number) {
  return await sessionRepository.deleteByUserId(userId);
}
