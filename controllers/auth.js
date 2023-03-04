const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');
const Role = require('../models/Role');

const registerUser = async (req, res = response) => {

    const { name, email, password, username } = req.body;
    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo.'
            })
        }

        //Role
        const role = await Role.findOne({ name: 'Usuario' });

        //Encriptar password
        user = new User({ username: username, name: name, email: email, password: password, role: role });
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id, user.name, user.role);

        res.status(201).json({
            ok: true,
            user: user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con el administrador."
        })
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).populate('role', 'name');
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario registrado con ese correo."
            })
        }
        //Validar password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta."
            });
        }
        const token = await generateJWT( user.id, user.name, user.role, user.email );

        res.json({
            ok: true,
            user: user,
            token
        })

    } catch (error) {
        console.log(error)
    }
}

const revalidateToken = async (req, res) => {

    const { uid, name, email, role } = req;
    //Generar un nuevo JWT y retornarlo en esta petición
    const token = await generateJWT(uid, name, role);
    const user = await User.findById(uid).populate('role', 'name');
    res.json({
        ok: true,
        user: user,
        token
    })
}


module.exports = {
    registerUser,
    loginUser,
    revalidateToken,
}