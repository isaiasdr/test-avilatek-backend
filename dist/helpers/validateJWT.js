"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req) => {
    const token = req.header('x-token');
    try {
        if (!token)
            throw new Error("No token provided");
        const { id = '' } = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED || '');
        return id;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map