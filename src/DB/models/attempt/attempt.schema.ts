import { Schema } from "mongoose";
import { Choice, IAttempt, STATUS } from "../../../utils";

export const attemptSchema = new Schema<IAttempt>({
   examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   answers: [{
      questionId: {
         type: Schema.Types.ObjectId,
         ref: "Question",
         required: true
      },
      selectedAnswer: {
         type: String,
         required: true
      }
   }],
   score: {
      type: Number,
      default: 0
   },
   startedAt: {
      type: Date,
      default: Date.now
   },
},{timestamps : true})
