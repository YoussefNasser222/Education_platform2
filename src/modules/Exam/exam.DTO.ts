import { Choice } from "../../utils";

export interface CreateExamDTO {
    title: string;
    duration: number;
    startAt: Date;
}
export interface AddQuestionsDTO {
    question: string;
    correctAnswer : string,
    choices : string[]
}
