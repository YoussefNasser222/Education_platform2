import z from "zod" ;
import { LEVEL } from "../../utils";

export const registerSchema = z.object({
  fullName: z.string().min(10).max(50),
  userName: z.string().min(3).max(20),
  phoneNumber: z.string().min(10).max(15),
  password: z.string().min(6),
  level : z.enum(LEVEL),
});

export const loginSchema = z.object({
  userName: z.string(),
  password: z.string(),
});