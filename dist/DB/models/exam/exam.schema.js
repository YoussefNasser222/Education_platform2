"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examSchema = void 0;
const mongoose_1 = require("mongoose");
exports.examSchema = new mongoose_1.Schema({
    duration: { type: Number, required: true },
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Question", required: true }],
    teacherId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    startAt: { type: Date, required: true },
    title: { type: String, required: true },
});
