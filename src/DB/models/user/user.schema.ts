import { Schema } from "mongoose";
import { PAID, IUser, LEVEL, Role } from "../../../utils";

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
    },
    ispaid : {
        type: String,
        enum: PAID,
        default: PAID.NO
    },
    paidUntil : {
        type: Date,
        default: null
    }
})
export default userSchema;