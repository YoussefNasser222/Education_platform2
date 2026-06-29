"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRepository = void 0;
const abstraction_respository_1 = require("../../abstraction.respository");
const exam_model_1 = require("./exam.model");
class ExamRepository extends abstraction_respository_1.AbstractRepository {
    constructor() {
        super(exam_model_1.Exam);
    }
}
exports.ExamRepository = ExamRepository;
