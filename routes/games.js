const {createGamePublication, fetchGamePublication, getOneGamePublication, updateGamePublication, deleteGamePublication, getGamesByRequirements} = require('../controllers/games');
const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getSteamGameDetails } = require('../controllers/steam');
const { checkRoleAuth } = require('../middlewares/roleAuth');
const router = Router();

// URL => /api/games
router.get('/apisteam', getSteamGameDetails);

//get all game posts
router.get('/', fetchGamePublication);

//get one game post
router.get('/:id', getOneGamePublication);

router.get('/level/:requirements', getGamesByRequirements);

//A partir de aqui abajo todas las rutas estan protegidas por un token de administrador.
router.use(validateJWT);
// router.use(checkRoleAuth(['Administrador']));

//update game post
router.put('/:id', updateGamePublication);

//create game post
router.post('/new', createGamePublication);

//delete game post
router.delete('/:id', deleteGamePublication);

module.exports = router;