"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const exam_service_1 = __importDefault(require("./exam.service"));
const router = (0, express_1.default)();
router.post("/", middleware_1.isAuth, middleware_1.isAdmin, exam_service_1.default.createExam);
router.delete("/:id", middleware_1.isAuth, middleware_1.isAdmin, exam_service_1.default.deleteExam);
router.get("/result/:id", middleware_1.isAuth, middleware_1.isAdmin, exam_service_1.default.getAllResult);
router.get("/:id", middleware_1.isAuth, exam_service_1.default.getExam);
router.put("/questions/:id", middleware_1.isAuth, middleware_1.isAdmin, exam_service_1.default.addQuestions);
router.put("/active/:id", middleware_1.isAuth, middleware_1.isAdmin, exam_service_1.default.avtiveExam);
router.post("/solve/:id", middleware_1.isAuth, exam_service_1.default.solveExam);
exports.default = router;
