"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorDBMessage = void 0;
const express_1 = require("express");
const errorDBMessage = (err, res = express_1.response) => {
    console.log(err);
    return res.status(500).json({
        ok: false,
        message: 'Put in contact with the administrator',
    });
};
exports.errorDBMessage = errorDBMessage;
//# sourceMappingURL=DbMessage.js.map