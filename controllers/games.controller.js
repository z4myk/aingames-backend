const { findById } = require("../model/games");
const gameSchema = require("../model/games");

const createGamePublication = (req, res) => {
  try {
    const gamePublication = gameSchema(req.body);
    gamePublication
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ msg: error }));
  } catch (error) {
    console.log(eror);
  }
};

const fetchGamePublication = (req, res) => {
  try {
    gameSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ msg: error }));
  } catch (error) {
    console.log(error);
  }
};

const getOneGamePublication = (req, res) => {
  try {
    const { id } = req.params;
    gameSchema;
    findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ msg: error }));
  } catch (error) {
    console.log(error);
  }
};

const updateGamePublication = (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      peso,
      categoria,
      sistemaOp,
      procesador,
      memoria,
      graficos,
      almacenamiento,
      plataforma,
      googleServ,
      mediafireServ,
      torrentServ,
      dddownload,
    } = req.body;

    gameSchema
    .updateOne({_id: id}, {$set: {
        nombre,
        peso,
        categoria,
        sistemaOp,
        procesador,
        memoria,
        graficos,
        almacenamiento,
        plataforma,
        googleServ,
        mediafireServ,
        torrentServ,
        dddownload}})
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
  }catch(error){
      console.log(error)
  }
};


const deleteGamePublication = (req, res) => {
    try{
        const {id} = req.params;

        gameSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({msg: error}))
    }catch(error){
        console.log(error)
    }
} 

module.exports = {
    createGamePublication,
    fetchGamePublication,
    getOneGamePublication,
    updateGamePublication,
    deleteGamePublication,



}