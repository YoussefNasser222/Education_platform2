import { Schema } from "mongoose";
import { ILevelTime, LEVEL } from "../../../utils";

export const levelTimeSchema = new Schema<ILevelTime>({
    level:{
        type : String,
        enum : LEVEL,
        required : true
    },
    time:{
        type : Date,
        required : true
    }
},{timestamps : true})