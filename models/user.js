const { Schema, model } = require("mongoose");
const userValidate = require("../middleware/userValidate");

const userSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'Nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'Correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'Rol es obligatorio'],
        enum: ['ADMIN', 'USER']
    },
    google: {
        type: Boolean,
        default: false
    },
    estado: {
        type: Boolean,
        default: true
    }
})

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id;
    return user
}

module.exports = model('User', userSchema);
