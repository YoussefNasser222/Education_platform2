import { Schema } from "mongoose";
import { IExam } from "../../../utils";

export const examSchema = new Schema<IExam>({
    duration : {type:Number,required:true},
    questions : [{type:Schema.Types.ObjectId,ref:"Question",required:true}],
    teacherId : {type:Schema.Types.ObjectId,ref:"User",required:true},
    startAt : {type:Date,required:true},
    title : {type:String,required:true},
    isActive:{type : Boolean,default : false}
},{timestamps : true})
