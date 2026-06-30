"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.questionSchema = new mongoose_1.Schema({
    choices: {
        type: [String],
        required: true
    },
    examId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Exam", required: true },
    correctAnswer: { type: String, required: true },
    question: { type: String, required: true }
}, { timestamps: true });
