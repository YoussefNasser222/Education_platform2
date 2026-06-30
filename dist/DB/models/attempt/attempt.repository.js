"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptRepository = void 0;
const abstraction_respository_1 = require("../../abstraction.respository");
const attempt_model_1 = require("./attempt.model");
class AttemptRepository extends abstraction_respository_1.AbstractRepository {
    constructor() {
        super(attempt_model_1.Attempt);
    }
}
exports.AttemptRepository = AttemptRepository;
