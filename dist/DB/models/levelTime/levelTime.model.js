"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelTime = void 0;
const mongoose_1 = require("mongoose");
const levelTime_schema_1 = require("./levelTime.schema");
exports.levelTime = (0, mongoose_1.model)("levelTime", levelTime_schema_1.levelTimeSchema);
