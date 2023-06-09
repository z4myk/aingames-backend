const { response } = require('express');
const Video = require('../models/Video');


const createVideo = async (req, res = response) => {
    const { name } = req.body;

    try {
        let video = await Video.findOne({ name });

        if (video) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un video con ese nombre.'
            });
        }
        video = new Video({ ...req.body });
        const saveVideo = await video.save();

        res.status(200).json({
            ok: true,
            msg: saveVideo,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno, hable con un administrador.'
        })
    }
}

const getVideos = async (req, res = response) => {
    try {
        const videos = await Video.find();
        res.status(200).json({
            ok: true,
            msg: videos,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno, hable con un administrador.'
        })
    }
}

const updateVideo = async (req, res = response) => {

    const videoId = req.params.id;
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un video con esa id."
            });
        }
        const actualizado = {
            ...req.body
        }

        const videoUpdated = await Video.findByIdAndUpdate(videoId, actualizado, { new: true })

        res.status(200).json({
            ok: true,
            msg: videoUpdated,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador."
        })
    }
}

const deleteVideo = async (req, res = response) => {

    const videoId = req.params.id;
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un video con esa id."
            })
        }

        await Video.findByIdAndDelete(videoId);

        res.status(200).json({
            ok: true,
            msg: 'El video se ha borrado de la base de datos.'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    createVideo,
    getVideos,
    updateVideo,
    deleteVideo,
}