const { response } = require('express');
const DownloadServer = require('../models/DownloadServer');
const Download = require('../models/DownloadServer');


const getDownloadServers = async (req, res = response) => {

    try {
        const download = await Download.find();
        res.status(200).json({
            ok: true,
            msg: download,
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Actualmente no existen servidores de descarga.'
        })
    }
}

const getDownloadServersByGameId = async (req, res = response) => {

    const gameId = req.body.gameId

    try {
        const download = await Download.find({ game: gameId });
        res.status(200).json({
            ok: true,
            msg: download,
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'No existen servidores de descarga asociados a esa id.'
        })
    }
}

const createDownloadServer = async (req, res = response) => {
    console.log(req.body);

    const download = new Download(req.body);

    try {
        const downloadServer = await download.save();
        res.status(200).json({
            ok: true,
            msg: downloadServer
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error al crear el servidor de descarga.'
        })
    }
}

const updateDownloadServer = async (req, res = response) => {

    const downloadServerId = req.body.id

    try {
        const newDownloadServer = {
            name: req.body.name, url: req.body.url
        }
        const updateDownloadServer = await DownloadServer.findByIdAndUpdate(downloadServerId, newDownloadServer, { new: true })

        res.status(200).json({
            ok: true,
            msg: updateDownloadServer,
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'No existen servidores de descarga asociados a esa id.'
        })
    }
}

const deleteDownloadServer = async (req, res = response) => {

    const downloadServerId = req.body.id

    try {
        await DownloadServer.findByIdAndDelete(downloadServerId);

        res.json({
            ok: true,
            msg: "Servidor de descarga eliminado."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error al intentar eliminar el servidor de descarga.'
        })
    }
}

module.exports = {
    createDownloadServer,
    updateDownloadServer,
    deleteDownloadServer,
    getDownloadServers,
    getDownloadServersByGameId,
}