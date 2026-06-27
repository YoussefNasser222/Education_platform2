import { Router } from "express";
import authService from "./auth.service";
import { isValid } from "../../middleware";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

router.post("/register", isValid(registerSchema),authService.register);
router.post("/login", isValid(loginSchema), authService.login);

export default router;