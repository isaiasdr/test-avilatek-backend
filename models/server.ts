import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { dbConnection } from '../db/config';
import authRoutes from '../routes/auth';
import usersRoutes from '../routes/user';


export class Server {

    private app: express.Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;

        this.connectDb();

        this.middlewares();

        this.routes();

        this.initDocs();
    }

    async connectDb () {
        await dbConnection();
    }

    middlewares() {
        this.app.use( cors() );

        //Lecture and parse body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/user', usersRoutes);
    }

    initDocs() {
        const swaggerDocs = swaggerJsDoc({
            definition: {
                openapi: '3.0.0',
                info: {
                    version: '1.0.0',
                    title: 'Documentation Test AvilaTek',
                    description: 'API Documentation',
                    contact: {
                        name: 'Isaias Dominguez',
                        email: 'isaiasdr12@gmail.com'
                    },
                }
            },
            
            apis: [
                "**/*.ts",
            ],
        });

        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup( swaggerDocs ));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running in port: ${ this.port }`)
        })
    }
}