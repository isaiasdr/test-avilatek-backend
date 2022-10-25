"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFields = (req = express_1.request, res = express_1.response, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors);
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=validate-fields.js.map