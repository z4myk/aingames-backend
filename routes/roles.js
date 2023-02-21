const {Router} = require('express');
const { createRole } = require('../controllers/roles');
const router = Router();

/* /api/roles */

router.post('/', createRole);

module.exports = router;