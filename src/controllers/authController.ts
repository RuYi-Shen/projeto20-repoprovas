import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function createUser(req: Request, res: Response) {
  const userInfo = req.body;
  delete userInfo.confirmPassword;

  await authService.createUser(userInfo);
  res.sendStatus(201);
}

export async function createSession(req: Request, res: Response) {
  const userId = res.locals.user.id;

  const session = await authService.createSession(+userId);
  res.send(session);
}

export async function endSession(req: Request, res: Response) {
  const userId = res.locals.user.id;

  await authService.endSession(userId);
  res.sendStatus(204);
}
