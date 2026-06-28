import { Schema } from "mongoose";
import { IUser, LEVEL, Role } from "../../../utils";

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    userName: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Role,
        default: Role.STUDENT
    },
    phoneNumber: { type: String, required: true , unique: true},
    level: {
        type: String,
        enum: LEVEL,
        required: true
    }
})
export default userSchema;