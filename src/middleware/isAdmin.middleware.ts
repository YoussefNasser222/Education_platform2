import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../utils";

export const isAdmin = (req : Request , res : Response , next : NextFunction)=>{
    const user = req.user;
    if(user?.role !== "admin"){
       return next(new BadRequestException("Unauthorized"));
    }
    next();
}