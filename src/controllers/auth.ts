import {Response, Request} from 'express';
import User from '../models/User'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userLogin = (req: Request , res:Response) => {
    const {email, password } = req.body;

    User.findOne({email}, (err:object, userFind: any) => {
        if (err) return res.status(500).json({
            ok: false,
            err
        });

        if(!userFind){
            return res.status(404).json({
                err: {
                    ok: false,
                    message: 'User or password incorrect, please try again'
                }
            });
        };

        if (!bcrypt.compareSync(password, userFind.password)){
            return res.status(500).json({
                ok:false,
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
            if (err) return res.status(500).json({ok:false, err});
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
    let email = req.body.email;

    User.findOne({email}, (err:object, userFind: any) => {
        if (err) return res.status(500).json({
            ok: false,
            err
        });

        if(!userFind){
            let user = new User({
                givenName: req.body.givenName,
                familyName: req.body.familyName,
                email: body.email,
                googleId: req.body.googleId,
                online: true,
            });

            let token = jwt.sign({
                user},
                String(process.env.JWT_SECRET),
                { expiresIn: process.env.TOKEN_TIME });
            
            user.token = token;
        
            user.save((err, newUser) => {
                if (err) {
                    return res.status(500).json({ ok: false, msg: 'Error saving in DB', err });
                }else {
                    return res.status(201).json({
                        ok: true,
                        user: newUser
                    });
                };
            });
        };

        let token = jwt.sign({
            user: userFind},
            String(process.env.JWT_SECRET),
            { expiresIn: process.env.TOKEN_TIME });

        userFind.givenName = req.body.givenName;
        userFind.familyName = req.body.familyName;
        userFind.email = body.email;
        userFind.googleId = req.body.googleId;
        userFind.token = token;
        userFind.online = true;

        userFind.save((err:object, updatedUser:object) => {
            if (err) return res.status(500).json({ok:false, err});
            else {
                return res.status(201).json({
                    ok: true,
                    user: updatedUser
                });
            };
        });
    });
};

const userRegistration = (req: Request, res: Response) => {

    const { givenName, familyName, email, password} = req.body;

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        
        if (err) return res.status(400).json({ok:false, err});
        
        bcrypt.hash(password, salt, function(err, hash) { 
            if (err) return res.status(400).json({ok:false, err});
            
            let newUser = new User({
                givenName,
                familyName,
                email,
                password: hash,
            });

            newUser.save((err, newUserDB)=>{
                if (err) return res.status(500).json({ok:false, err});
                res.status(201).json({
                    ok: true,
                    msg: 'New user created',
                    user: newUserDB
                });
            });
        });
    });
};

const userLogout = (req: Request, res: Response) => {
    let { token } = req.body;

    if (!token) {
        return res.status(404).json({
            ok: false,
            token: 'Not Found'
        });
    };

    User.findOne({ token }, (err: object, userFind: any) => {
        if (err) return res.status(400).json({ ok: false, err });
        if (!userFind) return res.status(404).json({ ok: false, err: 'Not Found'});

        userFind.token = 'null';
        userFind.online = false;
        
        userFind.save((err: object, updatedUser: object) => {
            if (err) return res.status(500).json(err);
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