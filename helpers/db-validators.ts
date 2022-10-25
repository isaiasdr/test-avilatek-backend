import { User } from "../models/user";

export const existEmail = async ( email: string = '' ) => {
    const user = await User.findOne({ email });

    if( user ) throw new Error(`Email: ${ email } already exist`);
}