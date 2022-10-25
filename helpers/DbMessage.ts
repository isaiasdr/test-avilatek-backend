import { response } from "express";

export const errorDBMessage = (err: any, res = response) => {
    console.log(err);

    return res.status(500).json({
        ok: false,
        message: 'Put in contact with the administrator',
    });
};