import z from "zod" ;

export const registerSchema = z.object({
  fullName: z.string().min(10).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15).optional(),
  password: z.string().min(6),
  role: z.enum(["student", "instructor", "admin"]).optional(),
  ispaid: z.enum(["yes" ,'no']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});