const { response } = require("express");
const Game = require("../models/Game");

const createGamePublication = (req, res = response) => {

  try {
    const index = req.body.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, '%26')
      .replace(/\?/g, '%3F');

    const gamePublication = Game({ ...req.body, index: index });
    gamePublication
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ msg: error }));
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, hable con un administrador.",
      error
    })
  }
};

const fetchGamePublication = (req, res) => {
  try {
    Game
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ msg: error }));
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, hable con un administrador.",
      error
    })
  }
};

//Obtener un juego.
const getOneGamePublication = async (req, res = response) => {
  const gameId = req.params.id;
  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un juego con esa id."
      });
    }

    res.status(200).json({
      ok: true,
      msg: game
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, hable con un administrador.",
      error
    })
  }
};

const updateGamePublication = async (req, res = response) => {

  const gameId = req.params.id;
  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un juego con esa id."
      })
    }

    const actualizado = {
      ...req.body
    }

    const gameActualizado = await Game.findByIdAndUpdate(gameId, actualizado, { new: true });

    res.json({
      ok: true,
      game: gameActualizado,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, hable con un administrador."
    })
  }
};


const deleteGamePublication = (req, res = response) => {
  try {
    const { id } = req.params;
    Game
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ msg: error }))
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, hable con un administrador.",
      error
    })
  }
}

const getGamesByRequirements = async (req, res = response) => {
  const { requirements } = req.params;
  try {
    const games = await Game.find({ requirements });
    res.status(200).json({
      ok: true,
      msg: games
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, hable con un administrador.",
      error
    })
  }

}

module.exports = {
  createGamePublication,
  fetchGamePublication,
  getOneGamePublication,
  updateGamePublication,
  deleteGamePublication,
  getGamesByRequirements,
}