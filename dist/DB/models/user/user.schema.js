"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: utils_1.Role,
        default: utils_1.Role.STUDENT
    },
    phoneNumber: { type: String },
});
exports.default = userSchema;
