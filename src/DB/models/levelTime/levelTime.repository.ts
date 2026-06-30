import { ILevelTime } from "../../../utils";
import { AbstractRepository } from "../../abstraction.respository";
import { levelTime } from "./levelTime.model";

export class LevelTimeRepository extends AbstractRepository<ILevelTime> {
    constructor() {
        super(levelTime)
    }
}