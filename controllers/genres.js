const Genre = require('../models/Genre');
const { response } = require("express");

const createGenre = async (req, res = response) => {
    const { name } = req.body;
    const index = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ').join('-');

    try {
        let genre = await Genre.findOne({ name });
        if (genre) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un género con ese nombre.'
            });
        }
        genre = new Genre({...req.body, index:index});
        await genre.save();
        res.status(201).json({
            ok: true,
            genre: genre,
        })
    } catch (error) {
        console.log(error);
    }
}
const getGenre = async (req, res = response) => {
    try {
        const genre = await Genre.find();

        res.status(200).json({
            ok: true,
            msg: genre,
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: error,
        })
    }
}

module.exports = {
    createGenre,
    getGenre,
}