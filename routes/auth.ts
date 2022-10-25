import { Router } from "express";
import { check } from 'express-validator';

import { loginUser, createUser, revalidateJWT } from "../controllers/auth";
import { existEmail } from "../helpers";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

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

router.get('/revalidate', revalidateJWT);


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
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password is required').isLength({ min: Number(process.env.MIN_LENGTH_PASSWORD) || 0 }),
    validateFields
], loginUser);

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
    check('name').not().isEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('email').custom( existEmail ),
    check('password', 'Password is required').isLength({ min: Number(process.env.MIN_LENGTH_PASSWORD) || 0 }),
    validateFields
], createUser);


export default router;