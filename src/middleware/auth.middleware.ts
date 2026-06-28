import { NextFunction, Request, Response } from "express";
import { BadRequestException, verifyToken } from "../utils";
import { UserRepository } from "../DB";
import { log } from "node:console";

export const isAuth = async (req : Request , res : Response , next : NextFunction)=>{
    const token = req.headers.authorization
    if(!token){
        next(new BadRequestException("Token is required"));
    }
    const payload = verifyToken(token);
    if(!payload){
        next(new BadRequestException("Invalid token"));
    }
    // check user exist
    const userRepo = new UserRepository();
    const user = await userRepo.exist({_id: payload._id});
    if(!user){
        next(new BadRequestException("User not found"));
    }
    req.user = user;
    next();
}