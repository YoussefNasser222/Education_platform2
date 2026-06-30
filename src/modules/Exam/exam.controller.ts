import Router from "express"
import { isAdmin, isAuth } from "../../middleware";
import examService from "./exam.service";
const router = Router();

router.post("/", isAuth, isAdmin, examService.createExam);
router.delete("/:id", isAuth, isAdmin, examService.deleteExam)
router.get("/result/:id", isAuth , isAdmin,examService.getAllResult)
router.get("/:id", isAuth,examService.getExam)
router.put("/questions/:id", isAuth, isAdmin, examService.addQuestions)
router.put("/active/:id", isAuth, isAdmin, examService.avtiveExam)
router.post("/solve/:id", isAuth, examService.solveExam)

export default router
