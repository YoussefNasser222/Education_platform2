"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default.object({
    fullName: zod_1.default.string().min(10).max(50),
    email: zod_1.default.string().email(),
    phoneNumber: zod_1.default.string().min(10).max(15).optional(),
    password: zod_1.default.string().min(6),
    role: zod_1.default.enum(["student", "instructor", "admin"]).optional(),
    ispaid: zod_1.default.enum(["yes", 'no']).optional(),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
