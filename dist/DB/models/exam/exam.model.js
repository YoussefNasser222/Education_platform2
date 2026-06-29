"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exam = void 0;
const mongoose_1 = require("mongoose");
const exam_schema_1 = require("./exam.schema");
exports.Exam = (0, mongoose_1.model)("Exam", exam_schema_1.examSchema);
