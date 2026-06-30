import { Types } from "mongoose";
import { Choice } from "../../utils";

export interface CreateExamDTO {
    title: string;
    duration: number;
    startAt: Date;
}
export interface AddQuestionsDTO {
    question: string;
    correctAnswer: string,
    choices: string[]
}

export interface SolveExamDTO {
    answers: {
        questionId: Types.ObjectId;
        selectedAnswer: string;
    }[]
}
