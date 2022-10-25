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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("../db/config");
const auth_1 = __importDefault(require("../routes/auth"));
const user_1 = __importDefault(require("../routes/user"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT) || 3000;
        this.connectDb();
        this.middlewares();
        this.routes();
        this.initDocs();
    }
    connectDb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        //Lecture and parse body
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/api/auth', auth_1.default);
        this.app.use('/api/user', user_1.default);
    }
    initDocs() {
        const swaggerDocs = (0, swagger_jsdoc_1.default)({
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
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in port: ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map