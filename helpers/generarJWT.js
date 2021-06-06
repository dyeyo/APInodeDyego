const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const paylod = { uid }
        jwt.sign(paylod, process.env.KEYTOKEN, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se genero TOKEN')
            }
            resolve(token)
        })
    })
}

module.exports = { generarJWT }