"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const mongoose_1 = require("mongoose");
const utils_1 = require("../../utils");
class ExamService {
    constructor() {
        this.examRepo = new DB_1.ExamRepository();
        this.QuestionRepo = new DB_1.QuestionRepository();
        this.attemptRepo = new DB_1.AttemptRepository();
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
            await this.QuestionRepo.deleteMany({ examId: examId });
            return res.status(200).json({
                message: "exam deleted successfully",
                success: true
            });
        };
        this.getExam = async (req, res) => {
            const examId = req.params.id;
            const exam = await this.examRepo.exist({ _id: examId }, {}, {
                populate: [{
                        path: "teacherId",
                        select: "fullName"
                    }, {
                        path: "questions"
                    }]
            });
            if (!exam) {
                throw new utils_1.NotFoundException("exam not found");
            }
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
            await this.examRepo.findOneAndUpdate({ _id: examId }, { $push: { questions: question._id } });
            const { correctAnswer, ...other } = question.toObject();
            return res.status(201).json({
                message: "question added successfully",
                success: true,
                data: { ...other }
            });
        };
        this.avtiveExam = async (req, res) => {
            const examId = req.params.id;
            const { isActive } = req.body;
            const exam = await this.examRepo.findOneAndUpdate({ _id: examId }, { isActive }, { new: true });
            return res.status(200).json({
                message: "exam activated or not activated successfully",
                success: true
            });
        };
        this.solveExam = async (req, res) => {
            const examId = new mongoose_1.Types.ObjectId(req.params.id);
            const userId = req.user._id;
            const solveExamDto = req.body;
            const exam = await this.examRepo.exist({ _id: examId, isActive: true });
            if (!exam) {
                throw new utils_1.NotFoundException("exam not found or not active");
            }
            const alreadySolved = await this.attemptRepo.exist({
                examId,
                userId
            });
            if (alreadySolved) {
                throw new utils_1.BadRequestException("you already solved this exam");
            }
            const attempt = await this.attemptRepo.create({
                examId,
                userId,
                answers: solveExamDto.answers
            });
            let score = 0;
            for (const que of solveExamDto.answers) {
                const question = await this.QuestionRepo.exist({ _id: que.questionId });
                if (!question) {
                    throw new utils_1.NotFoundException("question not found");
                }
                if (question.correctAnswer == que.selectedAnswer) {
                    score++;
                }
            }
            await this.attemptRepo.findOneAndUpdate({ _id: attempt._id }, { score }, { returnDocument: "after" });
            return res.status(200).json({
                message: "exam solved successfully",
                success: true,
                data: { score }
            });
        };
        this.getAllResult = async (req, res) => {
            const examId = req.params.id;
            const attempt = await this.attemptRepo.getAll({ examId });
            if (!attempt || attempt.length === 0) {
                throw new utils_1.NotFoundException("attempt not found");
            }
            return res.status(200).json({
                message: "all result fetched successfully",
                success: true,
                data: attempt
            });
        };
    }
}
exports.default = new ExamService();
