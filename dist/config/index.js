"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.devConfig = {
    DB_URL: process.env.DB_URL,
    Port: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
};
