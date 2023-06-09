const User = require('../models/User')
const { response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validateUser } = require('../helpers/validateUser');

const getUsers = async (req, res = response) => {

    //Rellenar los datos del usuario asociado al rol
    try {
        const users = await User.find()
            .populate('role', 'name _id')

        res.status(200).json({
            ok: true,
            msg: users
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador.",
            error
          })
    }
}

const getOneUser = async (req, res = response) => {

    const userId = req.params.id;

    try {
        const user = await User.findById(userId)
            .populate('role', 'name _id');

        if (!user) {
            res.status(404).json({
                ok: false,
                msg: "No existe un usuario con esa id."
            });
        }

        res.status(200).json({
            ok: true,
            msg: user
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador.",
            error: error,
        })
    }
}
const updateUserPassword = async (req, res = response) => {

    const userId = req.params.id;

    //Validar permisos de usuario
    const validUser = validateUser(req, userId);
    if (validUser !== true) {
        return res.status(400).json({
            ok: false,
            msg: "No tienes permisos para actualizar esta cuenta."
        });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con esa id."
            });
        }

        let { password, newPassword } = {
            ...req.body
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta."
            });
        }
        if (newPassword === undefined) {
            return res.status(400).json({
                ok: false,
                msg: "Ingrese una contraseña nueva."
            });
        }
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(newPassword, salt);

        const userUpdate = await User.findByIdAndUpdate(userId, { password }, { new: true })

        res.status(200).json({
            ok: true,
            user: userUpdate,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador."
        });
    }
}

const updateUser = async (req, res = response) => {

    const userId = req.params.id;

    //Validar permisos de usuario
    const validUser = validateUser(req, userId);
    if (validUser !== true) {
        return res.status(400).json({
            ok: false,
            msg: "No tienes permisos para actualizar esta cuenta."
        });
    }

    try {

        //Comprobar si existe el usario
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con esa id."
            });
        }

        //Obtener variables del body
        let { username = user.username } = {
            ...req.body
        }

        if (username != user.username) {
            const validUsername = await User.findOne({ username });
            if (validUsername) {
                return res.status(400).json({
                    ok: false,
                    msg: `El username ${username} ya se encuentra registrado.`
                })
            }
        }
        const userUpdate = await User.findByIdAndUpdate(userId, { username }, { new: true })

        res.status(200).json({
            ok: true,
            user: userUpdate,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador."
        });
    }
}

module.exports = {
    getUsers,
    getOneUser,
    updateUser,
    updateUserPassword,
}