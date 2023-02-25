const { Router } = require('express');
const { getDownloadServersByGameId, createDownloadServer, updateDownloadServer, deleteDownloadServer, getDownloadServers } = require('../controllers/downloadServer');
const { checkRoleAuth } = require('../middlewares/roleAuth');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

//URL /api/download

//create game post
// router.use(validateJWT);
// router.use(checkRoleAuth(['Administrador']));

router.get('/', getDownloadServers)
router.post('/', createDownloadServer);
// router.get('/', getDownloadServersByGameId);
router.put('/', updateDownloadServer);
router.delete('/', deleteDownloadServer)

module.exports = router;