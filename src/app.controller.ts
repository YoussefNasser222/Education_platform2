import { Express, NextFunction, Request, Response } from "express";
import connectDB from "./DB/connection";
import { authRouter } from "./modules";
import { BadRequestException, errorHandler } from "./utils";
import rateLimit, { Options } from "express-rate-limit";
import cors from "cors";
export function bootstrap(app: Express, express: any) {
    connectDB();
    app.use(express.json());
    app.use(cors({
        origin: "*",
    }));
    // handle rate limiting
    const limiter = rateLimit({
        windowMs : 5 * 60 * 1000, // 5 minutes
        skipSuccessfulRequests : true ,
        limit : 3,
        handler : (req : Request , res : Response , next : NextFunction , options : Options)=>{
            throw new BadRequestException(options.message || "Too many requests");
        }
    })
    //   auth router
    app.use("/auth",limiter , authRouter);
    
    
    // handle invalid api
    app.use("/{*dummy}", (req: Request, res: Response, next: NextFunction) => {
        return res.status(400).json({ message: "invalid api", success: false });
    });
    // error handler
    app.use(errorHandler)
}
