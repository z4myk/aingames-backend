const Genre = require('../models/Genres');
const { response } = require("express");

const createGenre = async (req, res = response) => {
    const { name } = req.body;

    try {
        let genre = await Genre.findOne({ name });
        if (genre) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un género con ese nombre.'
            });
        }
        genre = new Genre(req.body);
        await genre.save();
        res.status(201).json({
            ok: true,
            uid: genre.id,
            name: genre.name,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createGenre,
}