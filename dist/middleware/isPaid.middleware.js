"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPaid = void 0;
const utils_1 = require("../utils");
const DB_1 = require("../DB");
const userRepo = new DB_1.UserRepository();
const isPaid = async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new utils_1.NotFoundException("user not found"));
    }
    if (!user.paidUntil) {
        return next(new utils_1.BadRequestException("No active subscription"));
    }
    if (new Date(user.paidUntil) < new Date()) {
        await userRepo.findOneAndUpdate({ _id: user._id }, { ispaid: utils_1.PAID.NO, paidUntil: null }, { new: true });
        return next(new utils_1.BadRequestException("Subscription expired"));
    }
    next();
};
exports.isPaid = isPaid;
