import { Response, Request, NextFunction} from 'express';
import {validationResult} from 'express-validator'

const validateErrors = (req: Request, res: Response, next:NextFunction) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){ // if errors, then error 400
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        });
    };

    next();
}

export {validateErrors};