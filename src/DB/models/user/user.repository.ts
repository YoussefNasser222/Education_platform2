import { AbstractRepository } from "../../abstraction.respository";
import { IUser } from "../../../utils";
import { User } from "./user.mode";

export class UserRepository extends AbstractRepository<IUser> {
    constructor() {
        super(User)
    }
}