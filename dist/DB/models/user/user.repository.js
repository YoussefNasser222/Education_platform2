"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstraction_respository_1 = require("../../abstraction.respository");
const user_mode_1 = require("./user.mode");
class UserRepository extends abstraction_respository_1.AbstractRepository {
    constructor() {
        super(user_mode_1.User);
    }
}
exports.UserRepository = UserRepository;
