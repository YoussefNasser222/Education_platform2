import Router from "express"
import { isAdmin, isAuth } from "../../middleware";
import examService from "./exam.service";
const router = Router();

router.post("/", isAuth, isAdmin, examService.createExam);
router.delete("/:id", isAuth, isAdmin, examService.deleteExam)
router.get("/:id", isAuth, isAdmin, examService.getExam)
router.put("/questions/:id", isAuth, isAdmin, examService.addQuestions)
export default router