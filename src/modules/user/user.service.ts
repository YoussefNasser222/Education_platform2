import { NextFunction, Request, Response } from "express";
import { TokenRepository, UserRepository } from "../../DB";
import { hashPassword, NotFoundException } from "../../utils";
import { UpdateUserDTo } from "./user.Dto";

class UserService {
    constructor() { }
    private readonly userRepo = new UserRepository();
    private readonly tokenRepo = new TokenRepository();
    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const userExist = await this.userRepo.exist({ _id: user._id });
        if (!userExist) {
            throw new NotFoundException("user not found");
        }
        const { password, role, ...other } = userExist.toObject();
        return res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            data: { ...other }
        });
    }
    updateProfile = async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const userUpdate: UpdateUserDTo = req.body;
        const userExist = await this.userRepo.exist({ _id: user._id });
        if (!userExist) {
            throw new NotFoundException("user not found");
        }
        const userUpdated = await this.userRepo.findOneAndUpdate({ _id: user._id }, {
            fullName: userUpdate.fullName ?? userExist.fullName,
            userName: userUpdate.userName ?? userExist.userName,
            password: userUpdate.password
                ? await hashPassword(userUpdate.password)
                : userExist.password,
            level: userUpdate.level ?? userExist.level,
            phoneNumber: userUpdate.phoneNumber ?? userExist.phoneNumber
        })
        const {password , role , ...others} = userUpdated.toObject();
        return res.status(200).json({
            message: "User profile updated successfully",
            success: true,
            data : {...others}
        });
    }
    deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const userExist = await this.userRepo.exist({ _id: user._id });
        if (!userExist) {
            throw new NotFoundException("user not found");
        }
        const userDeleted = await this.userRepo.deleteOne({ _id: user._id });
        await this.tokenRepo.deleteMany({ userId: user._id });
        return res.sendStatus(204);
    }
}

export default new UserService();