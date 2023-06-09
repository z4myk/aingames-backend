const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');
const Role = require('../models/Role');

const registerUser = async (req, res = response) => {

    const { email, password, username } = req.body;
    try {

        //Validar email y username
        const validEmail = await User.findOne({email});
        const validUsername = await User.findOne({username});

        if (validEmail) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya se encuentra registrado.`
            });
        }
        if (validUsername) {
            return res.status(400).json({
                ok: false,
                msg: `El username ${username} ya se encuentra registrado.`
            });
        }

        //Role
        const role = await Role.findOne({ name: 'Usuario' });

        //Encriptar password
        let user = new User({ username: username, email: email, password: password, role: role });
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id, user.username, user.role);

        res.status(201).json({
            ok: true,
            user: user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador."
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
                msg: "El email o la contraseña ingresada son incorrectos."
            });
        }
        const token = await generateJWT(user.id, user.username, user.role, user.email);

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

    const { uid, username, role } = req;
    //Generar un nuevo JWT y retornarlo en esta petición
    const token = await generateJWT(uid, username, role);
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