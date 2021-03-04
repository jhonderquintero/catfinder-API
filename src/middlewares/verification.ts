import jwt from 'jsonwebtoken';
import {Response, Request, NextFunction } from 'express';

export interface ExtendedRequest extends Request { // extends interface to admit request
    user: string
};

let tokenVerification = (req:ExtendedRequest, res:Response, next:NextFunction) =>{
    let token : any = req.get('Authorization');

    jwt.verify(token, String(process.env.JWT_SECRET), (err: any, decoded:any)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        };
        req.user = decoded.user;
        next();
    });         
};


export default tokenVerification;