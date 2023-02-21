const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const {getUsers, getOneUser} = require('../controllers/users');
const { checkRoleAuth } = require('../middlewares/roleAuth');
const router = Router();

/* Ruta => /api/user */

router.use(validateJWT);
router.use(checkRoleAuth(['Administrador']));

router.get('/list', getUsers);
router.get('/:id', getOneUser);

module.exports = router;