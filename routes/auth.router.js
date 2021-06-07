const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controller/auth')
const { userValidate } = require('../middleware');
const router = Router()

router.post('/login', [
    check('correo', 'Este campo es obligatorio').isEmail(),
    check('password', 'Este campo es obligatorio').not().isEmpty(),
    userValidate
], login)

module.exports = router