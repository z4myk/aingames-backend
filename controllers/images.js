const { response } = require("express");
const fs = require('fs');
const Image = require('../models/Image');

const uploadImage = async (req, res = response) => {

    try {
        if (req.files == null || req.body.game == null || req.body.name == null) return res.status(400).json({
            ok: false,
            msg: "Ocurrió un error al ingresar los datos."
        });

        const { file } = req.files;
        file.name = `${req.body.name}.png`;
        const urlImage = `http://localhost:9001/store/${req.body.game}/${file.name}`;
        const dir = `./public/store/${req.body.game}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        };

        file.mv(`./public/store/${req.body.game}/${file.name}`, err => {
            if (err) return res.send({ error: err });
        });
        
        const image = new Image({ ...req.body, url: urlImage });
        const imgSave = await image.save();

        res.status(200).json({
            ok: true,
            img: imgSave
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador."
        })
    }
}

const getOneImage = async (req, res = response) => {
    const imageId = req.params.id;
    try {
        const image = await Image.findById(imageId);
        console.log(image);
        if (!image) {
            return res.status(404).json({
                ok: false,
                msg: "No existe una imagen con esa id."
            })
        }

        res.status(200).json({
            ok: true,
            msg: image
        })

    } catch (error) {
        console.log(error);
    }
}

const deleteImage = async (req, res = response) => {
    const game = req.body.steamId;
    try {
        const image = await Image.findOne({game});
        if (!image) {
            return res.status(404).json({
                ok: false,
                msg: "No existe una imagen con esa id."
            })
        }

        await Image.findOneAndDelete({game});

        res.status(200).json({
            ok: true,
            msg:'La imagen se ha borrado de la base de datos.'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador."
        })
    }
}

module.exports = {
    uploadImage,
    getOneImage,
    deleteImage
}
