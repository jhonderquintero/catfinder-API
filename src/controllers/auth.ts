import {Response, Request} from 'express';
import User from '../models/User'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userLogin = (req: Request , res:Response) => {
    const {email, password } = req.body;

    User.findOne({email}, (err:object, userFind: any) => {
        if(err) return res.status(500).json({
            err
        });

        if(!userFind){
            return res.status(400).json({
                err: {
                    message: 'User or password incorrect, please try again'
                }
            });
        };

        if (!bcrypt.compareSync(password, userFind.password)){
            return res.status(400).json({
                err: {
                    message: 'User or password incorrect, please try again'
                }
            });
        };
        
        // All good
        
        let token = jwt.sign({
            user: userFind},
            String(process.env.JWT_SECRET),
            {expiresIn: process.env.TOKEN_TIME});

        res.status(200).json({
            ok: true,
            msg: 'Validation success',
            user: userFind,
            token
        });
    });
};

const newUser = (req: Request, res:Response) => {
    const { name, email, password, googleId, imageUrl, online} = req.body;

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        
        if (err) res.status(400).send(err); 
        
        bcrypt.hash(password, salt, function(err, hash) { 
            if (err) res.status(400).send(err);
            
            let newUser = new User({
                name,
                email,
                password: hash,
                googleId,
                online
            });

            newUser.save((err, newUserDB)=>{
                if(err) res.status(400).send(err);

                res.status(201).json({
                    ok: true,
                    msg: 'new user created',
                    user: newUserDB
                });
            });
        });
    });
};

const tokenRevalidate = (req: Request, res:Response) : void => {
    res.json({
        ok: true,
        msg: 'renew'
    });
};

export {
    userLogin,
    newUser,
    tokenRevalidate
}