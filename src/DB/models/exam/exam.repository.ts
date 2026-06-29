import { IExam } from "../../../utils";
import { AbstractRepository } from "../../abstraction.respository";
import { Exam } from "./exam.model";

export class ExamRepository extends AbstractRepository<IExam> {
    constructor() {
        super(Exam);
    }
}