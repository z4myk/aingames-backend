const {Router} = require('express');
const { createGenre } = require('../controllers/genres');
const router = Router();
/* /api/roles */

router.post('/', createGenre);

module.exports = router;