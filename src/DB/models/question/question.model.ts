import { model } from "mongoose";
import { questionSchema } from "./question.schema";

export const Question = model("Question" , questionSchema);