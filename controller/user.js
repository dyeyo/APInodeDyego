const { response } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');

const getUser = async (req, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true }

    // const users = await User.find(query)
    //     .limit(+limit)
    //     .skip(+desde);

    // const total = await User.countDocuments(query);

    //  ejectura las 2 promesas al tiempo es un obj de promesas
    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .limit(+limit)
            .skip(+desde)
    ]);

    res.json({
        usuarios,
        total
    })
}

const create = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new User({ nombre, correo, password, rol });

    //encriptar pass
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    //guardar
    await user.save();

    res.json({
        status: res.status,
        user
    })
}

const update = async (req, res) => {

    const id = req.params.id
    const { _id, password, google, correo, ...datosUpdate } = req.body

    //TODO VALIDAR ID
    if (password) {
        //encriptar pass
        const salt = bcryptjs.genSaltSync();
        datosUpdate.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, datosUpdate)

    res.json({
        status: res.status,
        user
    })
}

const destroy = async (req, res) => {

    const id = req.params.id
    // const user = await User.findByIdAndDelete(id)
    const user = await User.findByIdAndUpdate(id, { estado: false })
    const usuarioAutenticado = req.usuario

    res.json({
        user,
        usuarioAutenticado
    })
}

module.exports = {
    getUser,
    create,
    update,
    destroy,
}