import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = ( req: Request ) => {

    const token = req.header('x-token');
    
    try {
        if (!token) throw new Error("No token provided");

        const { id = '' } = jwt.verify(token, process.env.SECRET_JWT_SEED || '') as { id: string };
        return id;

    } catch (error) {
        console.log(error);
        return false;
    }
}
