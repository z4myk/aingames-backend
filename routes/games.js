const express = require('express');
const {createGamePublication, fetchGamePublication, getOneGamePublication, updateGamePublication, deleteGamePublication} = require('../controllers/games');
const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

// URL => /api/games


//get all game posts
router.get("/", fetchGamePublication);

//get one game post
router.get("/:id", getOneGamePublication);



//A partir de aqui abajo todas las rutas estan protegidas por un token.
// router.use(validateJWT);


//update game post
router.put("/:id", updateGamePublication);

//create game post
router.post("/new", createGamePublication);

//delete game post
router.delete("/:id", deleteGamePublication);

module.exports = router;