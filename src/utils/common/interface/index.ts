import { ObjectId, Types } from "mongoose";
import { isPaid, LEVEL, Role } from "../enums";

export interface IUser {
  _id? : Types.ObjectId
  fullName: string;
  userName: string;
  phoneNumber: string;
  password: string;
  role?: Role ;
  ispaid? : isPaid;
  level : LEVEL;
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
