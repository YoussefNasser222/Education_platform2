import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";
import { BadRequestException } from "../utils";

export const isValid = (schema : ZodType)=>{
    return (req: Request, res: Response, next: NextFunction) => {
        const body = {
            ...req.body,
            ...req.headers
        };
        const result = schema.safeParse(body);
        if(result.success == false){
            let errorMassage = result.error.issues.map((issues)=>({
              path : issues.path[0],
              message : issues.message
            }))
            return next(new BadRequestException("validation error", errorMassage))
        }
        next()
    };
}