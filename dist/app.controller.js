"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const connection_1 = __importDefault(require("./DB/connection"));
const modules_1 = require("./modules");
const utils_1 = require("./utils");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
function bootstrap(app, express) {
    (0, connection_1.default)();
    app.use(express.json());
    app.use((0, cors_1.default)({
        origin: "*",
    }));
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 5 * 60 * 1000,
        skipSuccessfulRequests: true,
        limit: 3,
        handler: (req, res, next, options) => {
            throw new utils_1.BadRequestException(options.message || "Too many requests");
        }
    });
    app.use("/auth", limiter, modules_1.authRouter);
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(400).json({ message: "invalid api", success: false });
    });
    app.use(utils_1.errorHandler);
}
