"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const question_schema_1 = require("./question.schema");
exports.Question = (0, mongoose_1.model)("Question", question_schema_1.questionSchema);
