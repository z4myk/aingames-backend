const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');
const Role = require('../models/Role');
const { transporter } = require('../helpers/nodemailer');
const jwt = require('jsonwebtoken');
const base64url = require('base64url');

const registerUser = async (req, res = response) => {
    const { email, password, username } = req.body;

    try {

        //Validar email y username
        const validEmail = await User.findOne({ email });
        const validUsername = await User.findOne({ username });

        if (validEmail) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya se encuentra registrado.`
            });
        }
        if (validUsername) {
            return res.status(400).json({
                ok: false,
                msg: `El nombre de usuario ${username} ya se encuentra registrado.`
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
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador.",
            error
        })
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).populate('role', 'name');
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No pudimos encontrar tu cuenta de AINTECH Online."
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
        res.status(500).json({
            ok: false,
            msg: 'Error interno, hable con el administrador.',
            error
        })
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


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No pudimos encontrar tu cuenta de AINTECH Online."
            })
        }

        const token = jwt.sign({ id: user._id, username: user.username, role: user.role },
            process.env.SECRET_JWT_SEED,
            { expiresIn: '15m' })

        const encodedToken = base64url.encode(token);

        await transporter.sendMail({
            from: 'aintechsoftware@gmail.com',
            to: user.email,
            subject: 'Restablecimiento de contraseña',
            text: `Para restablecer tu contraseña haz click en el siguiente enlace http://localhost:5173/auth/reset-password/${encodedToken}`
        });

        res.status(200).json({
            ok: true,
            msg: 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno, hable con el administrador.',
            error,
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, token } = req.body;
        jwt.verify(token, process.env.SECRET_JWT_SEED, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    msg: 'El Token inválido o ha expirado.'
                });
            }
            const userId = decoded.id;

            let user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    ok: false,
                    msg: "No pudimos encontrar tu cuenta de AINTECH Online.",
                })
            }

            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);

            await user.save();

            res.status(200).json({
                ok: true,
                msg: "La contraseña se ha cambiado exitosamente.",
            })
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno, hable con el administrador.',
            error,
        })
    }
}


module.exports = {
    registerUser,
    loginUser,
    revalidateToken,
    forgotPassword,
    resetPassword
}