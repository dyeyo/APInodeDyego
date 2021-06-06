const Role = require('../models/role');
const User = require('../models/user');

const rolValidate = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    console.log(existeRol);
    if (!existeRol) {
        throw new Error(`El ${rol} no es valido`)
    }
}


const emailExist = async (correo = '') => {
    const existeEmail = await User.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El ${correo} ya existe`)
    }
}

const idUserExist = async (id = '') => {
    const existeUser = await User.findById(id)
    if (!existeUser) {
        throw new Error(`El ${id} no existe`)
    }
}

module.exports = { rolValidate, emailExist, idUserExist }