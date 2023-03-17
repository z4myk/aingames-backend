const {Router} = require('express');
const { uploadImage, getOneImage, deleteImage} = require('../controllers/images');
const { checkRoleAuth } = require('../middlewares/roleAuth');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();



/* /api/images */

router.use(validateJWT);
// router.use(checkRoleAuth(['Administrador']));
router.post('/upload', uploadImage);
router.delete('/', deleteImage);
router.get('/:id', getOneImage);

module.exports = router;