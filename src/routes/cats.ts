import { filterCats, getAllCats, AddFavoriteElement } from '../controllers/cats';
import { validateErrors } from '../middlewares/validateErrors';
import {Router} from 'express';
import {check} from 'express-validator';

const router: Router = Router();

// GET ALL from api/cats
router.get('/', getAllCats);

// FILTER CATS from api/cats/category
router.get('/category', filterCats);

// FAVORITE CATS from api/cats/favorite 
// Must have an active session to this
router.post('/favorite',
[
  check('token', 'Token is necessary').not().isEmpty(),
  check('img_url', 'img_url is necessary').not().isEmpty(),
    validateErrors
],AddFavoriteElement);

// Possible new future features
// router.delete('/favorite/delete', DeleteFavoriteElement in one user collection);

module.exports = router;