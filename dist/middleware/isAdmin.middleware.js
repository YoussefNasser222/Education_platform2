"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const utils_1 = require("../utils");
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user?.role !== "admin") {
        return next(new utils_1.BadRequestException("Unauthorized"));
    }
    next();
};
exports.isAdmin = isAdmin;
