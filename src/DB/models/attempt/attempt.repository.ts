import { IAttempt, IQuestion } from "../../../utils";
import { AbstractRepository } from "../../abstraction.respository";
import { Attempt} from "./attempt.model";

export class AttemptRepository extends AbstractRepository<IAttempt> {
    constructor() {
        super(Attempt);
    }
}