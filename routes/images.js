const {Router} = require('express');
const { uploadImage } = require('../controllers/images');
const router = Router();



/* /api/images */

router.post('/upload', uploadImage);
router.get('/', uploadImage);
router.get('/:id', uploadImage);
router.delete('/:id', uploadImage);

module.exports = router;