"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const helpers_1 = require("../helpers");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/auth/revalidate:
 *  get:
 *      tags:
 *          - Auth
 *      summary: Get a new JWT
 *      description: Get a new JWT
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: x-token
 *        in: header
 *        required: true
 *        description: JSON Web Token
 *      responses:
 *          200:
 *              description: User authenticated and new JWT
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *
*/
router.get('/revalidate', auth_1.revalidateJWT);
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      tags:
 *          - Auth
 *      summary: Login User
 *      description: Login User
 *      produces:
 *      - application/json
 *      requestBody:
 *          description: user to login
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                         - email
 *                         - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: User authenticated and new JWT
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                          format: email
 *                              token:
 *                                  type: string
*/
router.post('/login', [
    (0, express_validator_1.check)('email', 'Email not valid').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: Number(process.env.MIN_LENGTH_PASSWORD) || 0 }),
    validate_fields_1.validateFields
], auth_1.loginUser);
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      tags:
 *          - Auth
 *      summary: register User
 *      description: register User
 *      produces:
 *      - application/json
 *      requestBody:
 *          description: user to register
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                         - email
 *                         - password
 *                         - name
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              format: password
 *      responses:
 *          200:
 *              description: user created and new JWT
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                          format: email
 *                                      _id:
 *                                          type: string
 *                              token:
 *                                  type: string
*/
router.post('/register', [
    (0, express_validator_1.check)('name').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email not valid').isEmail(),
    (0, express_validator_1.check)('email').custom(helpers_1.existEmail),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: Number(process.env.MIN_LENGTH_PASSWORD) || 0 }),
    validate_fields_1.validateFields
], auth_1.createUser);
exports.default = router;
//# sourceMappingURL=auth.js.map