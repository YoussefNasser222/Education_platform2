import { Schema } from "mongoose";
import { IToken } from "../../utils";

export const tokenSchema = new Schema<IToken>({
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}) 