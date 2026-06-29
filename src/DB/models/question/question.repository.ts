import { IQuestion } from "../../../utils";
import { AbstractRepository } from "../../abstraction.respository";
import { Question } from "./question.model";

export class QuestionRepository extends AbstractRepository<IQuestion> {
    constructor() {
        super(Question)
    }
}