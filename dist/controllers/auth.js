"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateJWT = exports.createUser = exports.loginUser = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const helpers_1 = require("../helpers");
const validateJWT_1 = require("../helpers/validateJWT");
const loginUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email = '', password = '' } = req.body;
    try {
        const user = yield user_1.User.findOne({ email: email.toLowerCase() }).lean();
        if (!user) {
            return res.status(400).json({
                message: 'incorrect email or password'
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'incorrect email or password'
            });
        }
        const token = yield (0, helpers_1.generateJWT)(user._id.toString());
        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
            },
            token
        });
    }
    catch (error) {
        return (0, helpers_1.errorDBMessage)(error, res);
    }
});
exports.loginUser = loginUser;
const createUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { password = '', name = '', email = '' } = req.body;
    try {
        const newUser = new user_1.User({
            email: email.toLowerCase(),
            name: name.toLowerCase()
        });
        const salt = bcryptjs_1.default.genSaltSync();
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        yield newUser.save();
        const token = yield (0, helpers_1.generateJWT)(newUser._id.toString());
        return res.status(200).json({
            user: newUser,
            token
        });
    }
    catch (error) {
        return (0, helpers_1.errorDBMessage)(error, res);
    }
});
exports.createUser = createUser;
const revalidateJWT = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, validateJWT_1.validateJWT)(req);
    if (!id) {
        return res.status(401).json({
            message: 'Token invalid',
        });
    }
    const newToken = yield (0, helpers_1.generateJWT)(id);
    return res.status(200).json({
        token: newToken
    });
});
exports.revalidateJWT = revalidateJWT;
//# sourceMappingURL=auth.js.map