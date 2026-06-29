import { ObjectId, Types } from "mongoose";
import { PAID, LEVEL, Role, Choice, STATUS } from "../enums";

export interface IUser {
  _id? : Types.ObjectId
  fullName: string;
  userName: string;
  phoneNumber: string;
  password: string;
  role?: Role ;
  ispaid? : PAID;
  paidUntil? : Date;
  level : LEVEL;
}
export interface IExam{
  _id? : Types.ObjectId
  teacherId : Types.ObjectId
  title : string
  questions : Types.ObjectId[]
  duration : number
  startAt : Date
}
export interface IQuestion{
  _id? : Types.ObjectId
  examId : Types.ObjectId
  question : string
  choices : string[]
  correctAnswer : string
}
export interface IAttempt{
  _id? : Types.ObjectId
  userId : Types.ObjectId
  examId : Types.ObjectId
  answers : {
    questionId : Types.ObjectId
    selectedAnswer : Choice
  }[]
  score : number
  startedAt:Date
  submittedAt : Date
  status : STATUS
}
export interface IToken {
  token : string ,
  userId : Types.ObjectId
}
declare module "express" {
  interface Request {
    user?: IUser;
    role?: Role;
  }
}
declare module "jsonwebtoken" {
  interface JwtPayload {
    _id?: string;
    role?: string;
  }
}
declare module "jsonwebtoken" {
  interface Payload {
    _id?: string;
    role?: string;
  }
}
