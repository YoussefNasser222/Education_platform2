"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelTimeRepository = void 0;
const abstraction_respository_1 = require("../../abstraction.respository");
const levelTime_model_1 = require("./levelTime.model");
class LevelTimeRepository extends abstraction_respository_1.AbstractRepository {
    constructor() {
        super(levelTime_model_1.levelTime);
    }
}
exports.LevelTimeRepository = LevelTimeRepository;
