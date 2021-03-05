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
import {userLogin, newUser, userRegistration} from '../controllers/auth';
import {check} from 'express-validator';
import { validateErrors } from '../middlewares/validateErrors';

const router : Router = Router();

// {url}/api/auth (body.email, body.password)
router.post('/', 
[   //middlewares // LOGIN
    check('email', 'Email is necessary').isEmail().not().isEmpty(),
    check('password', 'Password must have 6 characters').isLength({ min: 6 }),
    validateErrors
],userLogin);

// {url}/api/auth/new (body.givenName, body.familyName, body.email, body.password);
router.post('/google/login',
[   //middlewares // GOOGLE REGISTER
    check('givenName', 'Name is necessary').not().isEmpty(),
    check('familyName', 'Family name is necessary').not().isEmpty(),
    check('email', 'Email is necessary').isEmail(),
    check('password', 'Password is necessary').not().isEmpty(),
    check('googleId', 'Google ID is necessary').not().isEmpty(),
    validateErrors
], newUser);

router.post('/register',
[   //middlewares // USER REGISTER
    check('givenName', 'Name is necessary').not().isEmpty(),
    check('familyName', 'Family name is necessary').not().isEmpty(),
    check('email', 'Email is necessary').isEmail(),
    check('password', 'Password is necessary').not().isEmpty(),
    validateErrors
],userRegistration);

module.exports = router;