import { IQuestion } from "../../../utils";
import { AbstractRepository } from "../../abstraction.respository";
import { Question } from "./attempt.model";

export class AttemptRepository extends AbstractRepository<IQuestion> {
    constructor() {
        super(Question);
    }
}