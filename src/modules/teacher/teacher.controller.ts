import { Router } from "express";
import { isAdmin, isAuth } from "../../middleware";
import teacherService from "./teacher.service";

const router = Router();
router.get("/students", isAuth, isAdmin, teacherService.getAllStudents);
router.get("/students/level/:level", isAuth, isAdmin, teacherService.getStudentByLevel);
router.get("/students/:id", isAuth, isAdmin, teacherService.getOneStudent);
router.put("/students/:id", isAuth, isAdmin, teacherService.updateStudent);
router.put("/students/paid/:id", isAuth, isAdmin, teacherService.updatePaid);
router.delete("/students/:id", isAuth, isAdmin, teacherService.deleteStudent);
export default router;