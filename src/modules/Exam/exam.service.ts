import { Request, Response } from "express";
import { AddQuestionsDTO, CreateExamDTO, SolveExamDTO } from "./exam.DTO";
import { AttemptRepository, ExamRepository, QuestionRepository } from "../../DB";
import { Types } from "mongoose";
import { BadRequestException, NotFoundException, STATUS } from "../../utils";
import { log } from "node:console";

class ExamService {
    constructor() { }
    private readonly examRepo = new ExamRepository();
    private readonly QuestionRepo = new QuestionRepository();
    private readonly attemptRepo = new AttemptRepository();
    createExam = async (req: Request, res: Response) => {
        const createExamDto: CreateExamDTO = req.body;
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
        })
    }
    deleteExam = async (req: Request, res: Response) => {
        const examId = req.params.id;
        const exam = await this.examRepo.deleteOne({ _id: examId });
        await this.QuestionRepo.deleteMany({ examId: examId });
        return res.status(200).json({
            message: "exam deleted successfully",
            success: true
        })
    }
    getExam = async (req: Request, res: Response) => {
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
            throw new NotFoundException("exam not found");
        }
        return res.status(200).json({
            message: "exam fetched successfully",
            success: true,
            data: { exam }
        })
    }
    addQuestions = async (req: Request, res: Response) => {
        const examId = new Types.ObjectId(req.params.id as string);
        const questionDto: AddQuestionsDTO = req.body;
        const examExist = await this.examRepo.exist({ _id: examId });
        if (!examExist) {
            throw new NotFoundException("exam not found");
        }
        const question = await this.QuestionRepo.create({
            examId: examId,
            choices: questionDto.choices,
            question: questionDto.question,
            correctAnswer: questionDto.correctAnswer
        })
        await this.examRepo.findOneAndUpdate({ _id: examId }, { $push: { questions: question._id } })
        const { correctAnswer, ...other } = question.toObject();
        return res.status(201).json({
            message: "question added successfully",
            success: true,
            data: { ...other }
        })
    }
    avtiveExam = async (req: Request, res: Response) => {
        const examId = req.params.id;
        const { isActive } = req.body;
        const exam = await this.examRepo.findOneAndUpdate({ _id: examId }, { isActive }, { new: true });
        return res.status(200).json({
            message: "exam activated or not activated successfully",
            success: true
        })
    }
    solveExam = async (req: Request, res: Response) => {
        const examId = new Types.ObjectId(req.params.id as string);
        const userId = req.user._id;
        const solveExamDto: SolveExamDTO = req.body;
        const exam = await this.examRepo.exist({ _id: examId, isActive: true });
        if (!exam) {
            throw new NotFoundException("exam not found or not active");
        }
        const alreadySolved =
            await this.attemptRepo.exist({
                examId,
                userId
            });

        if (alreadySolved) {
            throw new BadRequestException(
                "you already solved this exam"
            );
        }
        const attempt = await this.attemptRepo.create({
            examId,
            userId,
            answers: solveExamDto.answers
        })
        let score: number = 0;
        for (const que of solveExamDto.answers) {
            const question = await this.QuestionRepo.exist({ _id: que.questionId });
            if (!question) {
                throw new NotFoundException("question not found");
            }
            if (question.correctAnswer == que.selectedAnswer) {
                score++;
            }
        }
        await this.attemptRepo.findOneAndUpdate({ _id: attempt._id },
            { score }, { returnDocument: "after" });
        return res.status(200).json({
            message: "exam solved successfully",
            success: true,
            data: { score }
        })
    }
    getAllResult = async (req: Request, res: Response) => {
        const examId = req.params.id;
        const attempt = await this.attemptRepo.getAll({ examId });
        if (!attempt || attempt.length === 0) {
            throw new NotFoundException("attempt not found");
        }
        return res.status(200).json({
            message: "all result fetched successfully",
            success: true,
            data: attempt
        })
    }
}

export default new ExamService();


