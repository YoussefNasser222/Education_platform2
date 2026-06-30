"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attemptSchema = void 0;
const mongoose_1 = require("mongoose");
exports.attemptSchema = new mongoose_1.Schema({
    examId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    answers: [{
            questionId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Question",
                required: true
            },
            selectedAnswer: {
                type: String,
                required: true
            }
        }],
    score: {
        type: Number,
        default: 0
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
});
