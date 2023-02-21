const {Router} = require('express');
const { uploadImage, getOneImage } = require('../controllers/images');
const { checkRoleAuth } = require('../middlewares/roleAuth');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();



/* /api/images */

router.use(validateJWT);
// router.use(checkRoleAuth(['Administrador']));
router.post('/upload', uploadImage);
router.get('/', uploadImage);
router.get('/:id', getOneImage);
router.delete('/:id', uploadImage);

module.exports = router;