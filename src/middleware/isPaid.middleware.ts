import { NextFunction, Request, Response } from "express";
import { BadRequestException, NotFoundException, PAID, Role } from "../utils";
import { UserRepository } from "../DB";

const userRepo = new UserRepository();
export const isPaid = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        return next(new NotFoundException("user not found"))
    }
    if (!user.paidUntil) {
        return next(new BadRequestException("No active subscription"));
    }
    if (user.paidUntil < new Date()) {
        await userRepo.findOneAndUpdate({ _id: user._id },
            { ispaid: PAID.NO, paidUntil: null }, { new: true });
        return next(new BadRequestException("Subscription expired"))
    }
    next();
}