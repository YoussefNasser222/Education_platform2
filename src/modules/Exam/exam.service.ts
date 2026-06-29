import { Request, Response } from "express";
import { AddQuestionsDTO, CreateExamDTO } from "./exam.DTO";
import { ExamRepository, QuestionRepository } from "../../DB";
import { Types } from "mongoose";
import { NotFoundException } from "../../utils";
import { log } from "node:console";

class ExamService {
    constructor() { }
    private readonly examRepo = new ExamRepository();
    private readonly QuestionRepo = new QuestionRepository();
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
        await this.QuestionRepo.deleteMany({ examId: examId});
        return res.status(200).json({
            message: "exam deleted successfully",
            success: true
        })
    }
    getExam = async (req: Request, res: Response) => {
        const examId = req.params.id;
        const exam = await this.examRepo.exist({ _id: examId } , {} , {populate : [{
            path : "teacherId",
            select : "fullName"
        } , {
            path : "questions"
        }]});
        return res.status(200).json({
            message: "exam fetched successfully",
            success: true,
            data: { exam }
        })
    }
    addQuestions = async(req : Request , res : Response)=>{
        const examId = new Types.ObjectId(req.params.id as string);
        const questionDto: AddQuestionsDTO = req.body;
        const examExist = await this.examRepo.exist({ _id: examId });
        if(!examExist){
            throw new NotFoundException("exam not found");
        }
        const question = await this.QuestionRepo.create({
            examId : examId,
            choices : questionDto.choices,
            question : questionDto.question,
            correctAnswer : questionDto.correctAnswer
        })
        await this.examRepo.findOneAndUpdate({_id : examId} , {$push : {questions : question._id}})
        return res.status(201).json({
            message: "question added successfully",
            success: true,
            data: { question }
        })
    }
}

export default new ExamService();


