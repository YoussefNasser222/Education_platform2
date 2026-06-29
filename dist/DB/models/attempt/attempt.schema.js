"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attemptSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
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
                enum: utils_1.Choice,
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
    submittedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: utils_1.STATUS,
        default: utils_1.STATUS.IN_PROGRESS
    }
});
