const { response } = require('express');
const Role = require('../models/Role');



const createRole = async (req, res = response) => {

    const { name } = req.body;

    try {

        let role = await Role.findOne({ name });
        if (role) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un rol con ese nombre.'
            });
        }

        role = new Role(req.body);
        await role.save();

        res.status(201).json({
            ok: true,
            uid: role.id,
            name: role.name,
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createRole,

}