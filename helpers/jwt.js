const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name, role ) => {

    return new Promise((resolve, reject) => {

        const payload = {uid, name, role};
        //Firma del token: payload, palabra secreta y duración.
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token.');
            }
            resolve( token );
        })
    })
}

module.exports = {
    generateJWT
}