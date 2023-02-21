const User = require('../models/User')
const { response } = require('express');


const getUsers = async (req, res = response) => {

    //Rellenar los datos del usuario asociado al rol
    const users = await User.find()
        .populate('role', 'name _id')

    res.status(200).json({
        ok: true,
        msg: users
    })
}

const getOneUser = async (req, res = response) => {

    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate('role', 'name _id');
        console.log(user);
        
        if(!user){
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
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error interno, hable con el administrador."
        })
    }

  
}

module.exports = {
    getUsers,
    getOneUser,
}