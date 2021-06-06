const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) => {

    const { correo, password } = req.body;
    console.log(password);
    try {
        //verificar si el email existe
        const usuario = await User.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Datos no validos"
            })
        }
        //si el usuario esta activo
        if (!usuario.estado) {
            return res.status(404).json({
                msg: "Usuario no existe"
            })
        }
        //Verificar pass
        const validatePassword = bcryptjs.compareSync(password, usuario.password)
        if (!validatePassword) {
            return res.status(400).json({
                msg: "Password invalido"
            })
        }
        //Generar JWT
        const token = await generarJWT(usuario.id)
        return res.status(200).json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo salio mal"
        })
    }
}

module.exports = {
    login
}