import { model } from "mongoose";
import { questionSchema } from "../question/question.schema";

export const Question = model("Question", questionSchema);