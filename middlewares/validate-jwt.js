const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next ) => {

    //x-token headers
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición.'
        });
    }

    try {
        
        const {uid, username, role} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        
        req.uid = uid;
        req.username = username;
        req.role = role;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
    next();
}

module.exports = {
    validateJWT
}
