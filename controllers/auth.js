const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo.'
            })
        }

        //Encriptar password
        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        //Generar JWT
        const token = await generateJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok:false,
                msg: "No existe un usuario registrado con ese correo."
            })
        }
        //Validar password
        const validPassword = bcrypt.compareSync( password, user.password );
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta."
            });
        }
        const token = await generateJWT( user.id, user.name, user.email );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })

    } catch (error) {
        console.log(error)
    }
}

const revalidateToken = async (req, res) => {

    const {uid, name }= req;

    //Generar un nuevo JWT y retornarlo en esta petición
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        uid, name,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}