"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const middleware_1 = require("../../middleware");
const auth_validation_1 = require("./auth.validation");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", (0, middleware_1.isValid)(auth_validation_1.registerSchema), auth_service_1.default.register);
router.post("/login", (0, middleware_1.isValid)(auth_validation_1.loginSchema), auth_service_1.default.login);
router.post("/logout", auth_middleware_1.isAuth, auth_service_1.default.logOut);
exports.default = router;
