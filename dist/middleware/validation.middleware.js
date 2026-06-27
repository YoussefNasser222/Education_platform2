"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const utils_1 = require("../utils");
const isValid = (schema) => {
    return (req, res, next) => {
        const body = {
            ...req.body,
            ...req.headers
        };
        const result = schema.safeParse(body);
        if (result.success == false) {
            let errorMassage = result.error.issues.map((issues) => ({
                path: issues.path[0],
                message: issues.message
            }));
            return next(new utils_1.BadRequestException("validation error", errorMassage));
        }
        next();
    };
};
exports.isValid = isValid;
