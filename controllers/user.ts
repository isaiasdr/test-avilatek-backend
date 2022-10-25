import { response, request } from 'express';


import { User } from '../models/user';
import { errorDBMessage } from '../helpers';
import { validateJWT } from '../helpers/validateJWT';

export const getLoginUser = async ( req = request, res = response ) => {

    const id = validateJWT( req );

    if ( !id ) {
        return res.status(401).json({
            message: 'Token invalid',
        });
    }

    try {
        
        const user = await User.findById( id ).lean();

        if ( !user ) {
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

    } catch (error) {
        return errorDBMessage(error, res);
    }
};

export const getUsers = async ( req = request, res = response ) => {
    const { page = 0, limit = 5 } = req.query;

    const skip = Math.max( Number(page), 0 ) * Number(limit) ;

    try {
        const [ users, total ] = await Promise.all([
            User.find().limit(Number(limit)).skip(skip).select('name email _id').lean(),
            User.find().count()
        ]);

        let nextLink: string | null = null;

        if ( total > skip + users.length )
            nextLink = `${ req.protocol }://${ req.get('host') }${ req.originalUrl.split('?').shift() }?page=${ Number(page) + 1 }&limit=${ limit }`;

        if ( nextLink ) {
            return res.status(200).json({
                users,
                nextLink
            })
        }

        return res.status(200).json({ users });

    } catch (error) {
        return errorDBMessage(error, res);
    }
}


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