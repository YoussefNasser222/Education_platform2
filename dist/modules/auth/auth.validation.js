"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const utils_1 = require("../../utils");
exports.registerSchema = zod_1.default.object({
    fullName: zod_1.default.string().min(10).max(50),
    userName: zod_1.default.string().min(3).max(20),
    phoneNumber: zod_1.default.string().min(10).max(15),
    password: zod_1.default.string().min(6),
    level: zod_1.default.enum(utils_1.LEVEL),
});
exports.loginSchema = zod_1.default.object({
    userName: zod_1.default.string(),
    password: zod_1.default.string(),
});
