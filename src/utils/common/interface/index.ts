import { ObjectId, Types } from "mongoose";
import { isPaid, Role } from "../enums";

export interface IUser {
  fullName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role?: Role ;
  ispaid? : isPaid;
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
    _id?: ObjectId;
    role?: string;
  }
}
declare module "jsonwebtoken" {
  interface Payload {
    _id?: ObjectId;
    role?: string;
  }
}
