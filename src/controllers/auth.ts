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
        
        let token = jwt.sign({
            user: userFind},
            String(process.env.JWT_SECRET),
            { expiresIn: process.env.TOKEN_TIME });
        
        userFind.online = true;
        userFind.token = token;

        userFind.save((err:object, updatedUser:object) => {
            if (err) return res.status(400).json(err);
            else {
                return res.json({
                    ok: true,
                    user: updatedUser
                });
            };
        });
    });
};

const newUser = (req: Request, res:Response) => { //google login
    let body = req.body;

    let user = new User({
        givenName: req.body.givenName,
        familyName: req.body.familyName,
        email: body.email,
        googleId: req.body.googleId,
        online: true,
    });

    user.save((err, newUser) => {
        if (err) {
            return res.status(400).json({ ok: false, msg: 'Error saving in DB', err });
        }else {
            return res.json({
                ok: true,
                user: newUser
            });
        };
    });
};

const userRegistration = (req: Request, res: Response) => {

    const { givenName, familyName, email, password} = req.body;

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        
        if (err) return res.status(400).send(err); 
        
        bcrypt.hash(password, salt, function(err, hash) { 
            if (err) return res.status(400).send(err);
            
            let newUser = new User({
                givenName,
                familyName,
                email,
                password: hash,
            });

            newUser.save((err, newUserDB)=>{
                if(err) return res.status(400).send(err);
                res.status(201).json({
                    ok: true,
                    msg: 'new user created',
                    user: newUserDB
                });
            });
        });
    });
};

const userLogout = (req: Request, res: Response) => {
    let { token } = req.body;

    if (!token) {
        return res.status(400).json({
            ok: false,
            token: 'Invalid Token'
        });
    };

    User.findOne({ token }, (err: object, userFind: any) => {
        if (err) return res.status(400).json({ ok: false, err });
        if (!userFind) return res.status(400).json({ ok: false, err: 'Invalid Token' });

        userFind.token = 'null';
        userFind.online = false;
        
        userFind.save((err: object, updatedUser: object) => {
            if (err) return res.status(400).json(err);
            else {
                return res.json({
                    ok: true,
                    user: updatedUser
                });
            };
        });
    });
};

export {
    userLogin,
    newUser,
    userLogout,
    userRegistration,
};