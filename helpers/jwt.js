const jwt = require('jsonwebtoken');

const generateJWT = (uid, username, role) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, username, role };
        //Firma del token: payload, palabra secreta y duración.
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token.');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}