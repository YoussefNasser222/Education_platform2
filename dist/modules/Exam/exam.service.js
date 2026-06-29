"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const mongoose_1 = require("mongoose");
const utils_1 = require("../../utils");
class ExamService {
    constructor() {
        this.examRepo = new DB_1.ExamRepository();
        this.QuestionRepo = new DB_1.QuestionRepository();
        this.createExam = async (req, res) => {
            const createExamDto = req.body;
            const startDate = new Date(createExamDto.startAt);
            const exam = await this.examRepo.create({
                title: createExamDto.title,
                duration: createExamDto.duration,
                startAt: new Date(createExamDto.startAt),
                questions: [],
                teacherId: req.user._id
            });
            return res.status(201).json({
                message: "exam created successfully",
                success: true,
                data: { exam }
            });
        };
        this.deleteExam = async (req, res) => {
            const examId = req.params.id;
            const exam = await this.examRepo.deleteOne({ _id: examId });
            return res.status(200).json({
                message: "exam deleted successfully",
                success: true
            });
        };
        this.getExam = async (req, res) => {
            const examId = req.params.id;
            const exam = await this.examRepo.exist({ _id: examId }, {}, { populate: [{
                        path: "teacherId",
                        select: "fullName"
                    }, {
                        path: "questions"
                    }] });
            return res.status(200).json({
                message: "exam fetched successfully",
                success: true,
                data: { exam }
            });
        };
        this.addQuestions = async (req, res) => {
            const examId = new mongoose_1.Types.ObjectId(req.params.id);
            const questionDto = req.body;
            const examExist = await this.examRepo.exist({ _id: examId });
            if (!examExist) {
                throw new utils_1.NotFoundException("exam not found");
            }
            const question = await this.QuestionRepo.create({
                examId: examId,
                choices: questionDto.choices,
                question: questionDto.question,
                correctAnswer: questionDto.correctAnswer
            });
            return res.status(201).json({
                message: "question added successfully",
                success: true,
                data: { question }
            });
        };
    }
}
exports.default = new ExamService();
