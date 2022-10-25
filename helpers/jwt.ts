import jwt from 'jsonwebtoken';

export const generateJWT = ( id: string ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { id };

        jwt.sign( payload, process.env.SECRET_JWT_SEED || '', { 
            expiresIn: '15m'
        }, ( err, token ) => {
            if (err) {
                console.log(err);
                reject('cant generate the token');
            }

            resolve( token );
        });
    });
};