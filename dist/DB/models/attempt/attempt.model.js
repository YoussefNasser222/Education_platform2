"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attempt = void 0;
const mongoose_1 = require("mongoose");
const attempt_schema_1 = require("./attempt.schema");
exports.Attempt = (0, mongoose_1.model)("Attempt", attempt_schema_1.attemptSchema);
