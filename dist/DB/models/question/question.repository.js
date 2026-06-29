"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRepository = void 0;
const abstraction_respository_1 = require("../../abstraction.respository");
const question_model_1 = require("./question.model");
class QuestionRepository extends abstraction_respository_1.AbstractRepository {
    constructor() {
        super(question_model_1.Question);
    }
}
exports.QuestionRepository = QuestionRepository;
