"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const utils_1 = require("../utils");
const DB_1 = require("../DB");
const isAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        next(new utils_1.BadRequestException("Token is required"));
    }
    const payload = (0, utils_1.verifyToken)(token);
    if (!payload) {
        next(new utils_1.BadRequestException("Invalid token"));
    }
    const userRepo = new DB_1.UserRepository();
    const user = await userRepo.exist({ _id: payload._id });
    if (!user) {
        next(new utils_1.BadRequestException("User not found"));
    }
    req.user = user;
    next();
};
exports.isAuth = isAuth;
