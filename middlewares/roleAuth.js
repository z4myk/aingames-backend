const {response} = require('express');
const User = require('../models/User');
const Role = require('../models/Role');

const checkRoleAuth = (roles) => async (req, res = response, next) => { 

    try {
        const roleData = await Role.findById(req.role);

        if([].concat(roles).includes(roleData.name)){
            next();
        }else{
            res.status(409).json({
                ok: false,
                msg: 'No tienes permisos para realizar esta acción.'
            })          
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con un administrador.",
            error: error,
        })          
    }
}

module.exports = {
    checkRoleAuth
}