import Router from "express";
import { isAuth } from "../../middleware";
import userService from "./user.service";
const router = Router();

router.get("/profile", isAuth, userService.getProfile)
router.put("/profile", isAuth, userService.updateProfile);
router.delete("/profile", isAuth, userService.deleteProfile);
export default router;
