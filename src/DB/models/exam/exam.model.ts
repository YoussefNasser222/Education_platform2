import { model } from "mongoose";
import { examSchema } from "./exam.schema";

export const Exam = model("Exam", examSchema)