const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const {getUsers, updateUser, updateUserPassword} = require('../controllers/users');
const { checkRoleAuth } = require('../middlewares/roleAuth');
const router = Router();

/* Ruta => /api/user */

router.use(validateJWT);
router.use(checkRoleAuth(['Administrador']));
router.put('/:id', updateUser);
router.put('/security/:id', updateUserPassword);
router.get('/', getUsers);

// router.get('/:id',validateJWT, getOneUser);


module.exports = router;