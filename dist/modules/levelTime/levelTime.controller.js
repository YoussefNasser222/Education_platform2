"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const levelTime_service_1 = __importDefault(require("./levelTime.service"));
const router = (0, express_1.Router)();
router.post("/", middleware_1.isAuth, middleware_1.isAdmin, levelTime_service_1.default.addLevelTime);
router.patch("/:id", middleware_1.isAuth, middleware_1.isAdmin, levelTime_service_1.default.updateLevelTime);
router.delete("/:id", middleware_1.isAuth, middleware_1.isAdmin, levelTime_service_1.default.deleteLeveTime);
router.get("/:level", middleware_1.isAuth, levelTime_service_1.default.getLevelTimeByLevel);
router.get("/", middleware_1.isAuth, middleware_1.isAdmin, levelTime_service_1.default.getLevelTime);
exports.default = router;
