import { Router } from "express";

import { getLoginUser, getUsers } from "../controllers/user";

const router = Router();


/**
 * @swagger
 * /api/user:
 *   get:
 *      tags: 
 *          - User
 *      summary: Retrieve a list of users
 *      description: Retrieve a list of users
 *      produces: 
 *      - application/json
 *      parameters:
 *      - name: page
 *        in: query
 *        description: page value
 *      - name: limit
 *        in: query
 *        description: limit the quantity of users consulted
 *      responses:
 *          200:
 *              description: List of users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              users: 
 *                                  type: array
 *                                  items: 
 *                                      type: object
 *                                      properties:
 *                                          user: 
 *                                              type: object
 *                                              properties:
 *                                                  name: 
 *                                                      type: string
 *                                                  email: 
 *                                                      type: string
 *                                                      format: email
 *                              nextLink:
 *                                  type: string
*/
router.get('/', getUsers);


/**
 * @swagger
 * /api/findLogued:
 *   get:
 *      tags: 
 *          - User
 *      summary: retrieve the authenticated user
 *      description: retrieve the authenticated user
 *      produces: 
 *      - application/json
 *      parameters:
 *      - name: x-token
 *        in: header
 *        description: JSON Web token
 *        required: true
 *      responses:
 *          200:
 *              description: retrieve the authenticated user
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
*/
router.get('/findLogued', getLoginUser);


export default router;