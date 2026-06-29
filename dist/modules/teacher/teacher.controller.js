"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const teacher_service_1 = __importDefault(require("./teacher.service"));
const router = (0, express_1.Router)();
router.get("/students", middleware_1.isAuth, middleware_1.isAdmin, teacher_service_1.default.getAllStudents);
router.get("/students/level/:level", middleware_1.isAuth, middleware_1.isAdmin, teacher_service_1.default.getStudentByLevel);
router.get("/students/:id", middleware_1.isAuth, middleware_1.isAdmin, teacher_service_1.default.getOneStudent);
router.put("/students/:id", middleware_1.isAuth, middleware_1.isAdmin, teacher_service_1.default.updateStudent);
router.put("/students/paid/:id", middleware_1.isAuth, middleware_1.isAdmin, teacher_service_1.default.updatePaid);
router.delete("/students/:id", middleware_1.isAuth, middleware_1.isAdmin, teacher_service_1.default.deleteStudent);
exports.default = router;
