const express = require('express');
const gamesCtrl = require('../controllers/games.controller');
const router = express.Router();

//create game post
router.post("/games", gamesCtrl.createGamePublication);


//get all game posts
router.get("/games", gamesCtrl.fetchGamePublication);


//get one game post
router.get("/games/:id", gamesCtrl.getOneGamePublication);


//update game post
router.put("/games/:id", gamesCtrl.updateGamePublication);


//delete game post
router.delete("/games/:id", gamesCtrl.deleteGamePublication);


module.exports = router;