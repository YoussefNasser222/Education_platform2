import { Schema } from "mongoose";
import { IUser, Role } from "../../../utils";

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Role,
        default: Role.STUDENT
    },
    phoneNumber: { type: String },
})
export default userSchema;