"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelTimeRouter = exports.examRouter = exports.teacherRouter = exports.userRouter = exports.authRouter = void 0;
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
exports.authRouter = auth_controller_1.default;
const user_controller_1 = __importDefault(require("./user/user.controller"));
exports.userRouter = user_controller_1.default;
const teacher_controller_1 = __importDefault(require("./teacher/teacher.controller"));
exports.teacherRouter = teacher_controller_1.default;
const exam_controller_1 = __importDefault(require("./Exam/exam.controller"));
exports.examRouter = exam_controller_1.default;
const levelTime_controller_1 = __importDefault(require("./levelTime/levelTime.controller"));
exports.levelTimeRouter = levelTime_controller_1.default;
