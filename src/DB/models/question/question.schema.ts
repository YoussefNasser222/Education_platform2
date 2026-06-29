import { Schema } from "mongoose";
import { Choice, IQuestion } from "../../../utils";

    export const questionSchema = new Schema<IQuestion>({
        choices: {
            type : [String],
            required : true
        },
        examId : {type : Schema.Types.ObjectId, ref : "Exam", required : true},
        correctAnswer : {type : String ,required : true},
        question : {type : String, required : true}
    }) 