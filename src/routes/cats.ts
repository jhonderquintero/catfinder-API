import {Router} from 'express';
import {filterCats, getAllCats} from '../controllers/cats';

const router: Router = Router();

// GET ALL from api/cats
router.get('/', getAllCats);

// FILTER CATS from api/cats/category
router.get('/category', filterCats);

// Possible new future features
// router.post('/favorite', AddFavoriteElement to one user collection);
// router.delete('/favorite/delete', DeleteFavoriteElement in one user collection);

module.exports = router;