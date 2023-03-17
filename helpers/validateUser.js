const jwt = require('jsonwebtoken');

const validateUser = (req, userId) => {
    const token = req.header('x-token');

    //Verificar token de usuario
    const { uid, role } = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );

    if (uid != userId) {
        //Si el token no pertenece al usuario, comprobar si es administrador.
        if (role.name != 'Administrador') {
            return false
        }
    }
    return true
}

module.exports = {
    validateUser
}