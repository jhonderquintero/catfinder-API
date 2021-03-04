/* 
    User Routes / Authorizations
    Host + /api/auth

    CAT API KEY:
    91960c26-0727-471d-92ed-ba210e268b4f

    MONGO ATLAS:
    DB_USER: catfinder_user
    PASS: P3wTUjkqPafO7qFJ

    OAuth GOOGLE:
    Client ID = 890895167918-o17h2hmpatre78rjjd11o0rocf67pk53.apps.googleusercontent.com
    Client Secret = U17z_55tbQwdNOPHohhBFRm0
*/
import {Router} from 'express'; 
import {userLogin, newUser, tokenRevalidate} from '../controllers/auth';
import {check} from 'express-validator';
import {validateErrors} from '../middlewares/validateErrors';

const router : Router = Router();

router.post('/', 
[   //middlewares // LOGIN
    check('email', 'Email is necessary').isEmail().not().isEmpty(),
    check('password', 'Password must have 6 characters').isLength({ min: 6 }),
    validateErrors
],userLogin);

router.post('/new',
[   //middlewares // GOOGLE REGISTER
    check('name', 'Name is necessary').not().isEmpty(),
    check('email', 'Email is necessary').isEmail(),
    check('password', 'Password must have 6 characters').isLength({ min: 6 }),
    check('googleId', 'google id is necessary').not().isEmpty(),
    validateErrors
],newUser);

router.get('/renew',tokenRevalidate); // RENEW TOKEN

module.exports = router;