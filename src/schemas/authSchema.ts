import Joi from "joi";
import { User } from "@prisma/client";

type UserSchema = Partial<User> & { confirmPassword: string };

export const createUserInfo = Joi.object<UserSchema>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  //confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const createSessionInfo = Joi.object<User>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
