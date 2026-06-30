"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelTimeSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
exports.levelTimeSchema = new mongoose_1.Schema({
    level: {
        type: String,
        enum: utils_1.LEVEL,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, { timestamps: true });
