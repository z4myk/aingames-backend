const {Router} = require('express');
const { createGenre, getGenre } = require('../controllers/genres');
const router = Router();
/* /api/genres */

router.post('/', createGenre);
router.get('/', getGenre);
module.exports = router;