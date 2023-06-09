const {Router} = require('express');
const {createVideo, getVideos, updateVideo, deleteVideo} = require('../controllers/videos');
const router = Router();

/* Ruta => /api/videos */
router.post('/', createVideo);
router.get('/', getVideos);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;