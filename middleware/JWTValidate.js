const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWTValidate = async (req, res, netx) => {

    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg: 'Token no existe'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.KEYTOKEN);
        const usuario = await User.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no existe'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido, fue borrado'
            })
        }

        req.usuario = usuario
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'No autorizado'
        })
    }
    netx();
}

module.exports = JWTValidate
