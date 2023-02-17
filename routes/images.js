const {Router} = require('express');
const { uploadImage, getOneImage } = require('../controllers/images');
const router = Router();



/* /api/images */

router.post('/upload', uploadImage);
router.get('/', uploadImage);
router.get('/:id', getOneImage);
router.delete('/:id', uploadImage);

module.exports = router;