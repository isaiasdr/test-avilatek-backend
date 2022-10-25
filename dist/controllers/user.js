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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getLoginUser = void 0;
const express_1 = require("express");
const user_1 = require("../models/user");
const helpers_1 = require("../helpers");
const validateJWT_1 = require("../helpers/validateJWT");
const getLoginUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, validateJWT_1.validateJWT)(req);
    if (!id) {
        return res.status(401).json({
            message: 'Token invalid',
        });
    }
    try {
        const user = yield user_1.User.findById(id).lean();
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        return (0, helpers_1.errorDBMessage)(error, res);
    }
});
exports.getLoginUser = getLoginUser;
const getUsers = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 0, limit = 5 } = req.query;
    const skip = Math.max(Number(page), 0) * Number(limit);
    try {
        const [users, total] = yield Promise.all([
            user_1.User.find().limit(Number(limit)).skip(skip).select('name email _id').lean(),
            user_1.User.find().count()
        ]);
        let nextLink = null;
        if (total > skip + users.length)
            nextLink = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?').shift()}?page=${Number(page) + 1}&limit=${limit}`;
        if (nextLink) {
            return res.status(200).json({
                users,
                nextLink
            });
        }
        return res.status(200).json({ users });
    }
    catch (error) {
        return (0, helpers_1.errorDBMessage)(error, res);
    }
});
exports.getUsers = getUsers;
/* export const revalidateJWT = async ( req = request, res = response ) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No token provided'
        });
    }

    const id = validateJWT( token );

    if ( !id ) {
        return res.status(401).json({
            message: 'Token invalid',
        });
    }

    const newToken = await generateJWT( id );
    return res.status(200).json({
        token: newToken
    });
} */ 
//# sourceMappingURL=user.js.map