"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
class UserService {
    constructor() {
        this.userRepo = new DB_1.UserRepository();
        this.tokenRepo = new DB_1.TokenRepository();
        this.getProfile = async (req, res, next) => {
            const user = req.user;
            const userExist = await this.userRepo.exist({ _id: user._id });
            if (!userExist) {
                throw new utils_1.NotFoundException("user not found");
            }
            const { password, role, ...other } = userExist.toObject();
            return res.status(200).json({
                success: true,
                message: "User profile retrieved successfully",
                data: { ...other }
            });
        };
        this.updateProfile = async (req, res, next) => {
            const user = req.user;
            const userUpdate = req.body;
            const userExist = await this.userRepo.exist({ _id: user._id });
            if (!userExist) {
                throw new utils_1.NotFoundException("user not found");
            }
            const userUpdated = await this.userRepo.findOneAndUpdate({ _id: user._id }, {
                fullName: userUpdate.fullName ?? userExist.fullName,
                userName: userUpdate.userName ?? userExist.userName,
                password: userUpdate.password
                    ? await (0, utils_1.hashPassword)(userUpdate.password)
                    : userExist.password,
                level: userUpdate.level ?? userExist.level,
                phoneNumber: userUpdate.phoneNumber ?? userExist.phoneNumber
            }, { new: true });
            const { password, role, ...others } = userUpdated.toObject();
            return res.status(200).json({
                message: "User profile updated successfully",
                success: true,
                data: { ...others }
            });
        };
        this.deleteProfile = async (req, res, next) => {
            const user = req.user;
            const userExist = await this.userRepo.exist({ _id: user._id });
            if (!userExist) {
                throw new utils_1.NotFoundException("user not found");
            }
            const userDeleted = await this.userRepo.deleteOne({ _id: user._id });
            await this.tokenRepo.deleteMany({ userId: user._id });
            return res.sendStatus(204);
        };
    }
}
exports.default = new UserService();
