"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: utils_1.Role,
        default: utils_1.Role.STUDENT
    },
    phoneNumber: { type: String, required: true, unique: true },
    level: {
        type: String,
        enum: utils_1.LEVEL,
        required: true
    },
    ispaid: {
        type: String,
        enum: utils_1.PAID,
        default: utils_1.PAID.NO
    },
    paidUntil: {
        type: Date,
        default: null
    }
});
exports.default = userSchema;
