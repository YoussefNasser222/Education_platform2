"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const user_service_1 = __importDefault(require("./user.service"));
const router = (0, express_1.default)();
router.get("/profile", middleware_1.isAuth, user_service_1.default.getProfile);
router.put("/profile", middleware_1.isAuth, user_service_1.default.updateProfile);
router.delete("/profile", middleware_1.isAuth, user_service_1.default.deleteProfile);
exports.default = router;
