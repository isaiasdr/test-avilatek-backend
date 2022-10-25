import { response, request } from 'express';
import bcryptjs from 'bcryptjs';


import { User } from '../models/user';
import { errorDBMessage, generateJWT } from '../helpers';
import { RegisterUser, LoginUser } from '../interfaces/user';
import { validateJWT } from '../helpers/validateJWT';

export const loginUser = async ( req = request, res = response ) => {

    const { email = '', password = '' } = req.body as LoginUser;

    try {
        const user = await User.findOne({ email: email.toLowerCase() }).lean();

        if( !user ) {
            return res.status(400).json({
                message: 'incorrect email or password'
            });
        }

        const validPassword = bcryptjs.compareSync( password, user.password );

        if (!validPassword) {
            return res.status(400).json({
                message: 'incorrect email or password'
            });
        }

        const token = await generateJWT( user._id.toString() );

        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
            },
            token
        });

    } catch (error) {
        return errorDBMessage(error, res);
    }
};

export const createUser = async ( req = request, res = response ) => {
    const { password = '', name = '', email = '' } = req.body as RegisterUser;

    try {
        const newUser = new User({
            email: email.toLowerCase(),
            name: name.toLowerCase()
        });

        const salt = bcryptjs.genSaltSync();
        newUser.password = bcryptjs.hashSync( password, salt );

        await newUser.save();

        const token = await generateJWT( newUser._id.toString() );
        
        return res.status(200).json({
            user: newUser,
            token
        });

    } catch (error) {
        return errorDBMessage(error, res);
    }
}

export const revalidateJWT = async ( req = request, res = response ) => {

    const id = validateJWT( req );

    if ( !id ) {
        return res.status(401).json({
            message: 'Token invalid',
        });
    }

    const newToken = await generateJWT( id );
    return res.status(200).json({
        token: newToken
    });
}