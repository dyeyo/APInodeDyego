const isADMIN = (req, res, next) => {

    const user = req.usuario;
    if (!user) {
        res.json({
            status: 500,
            msg: "Error en el token"
        })
    }
    if (user.rol != 'ADMIN') {
        res.json({
            status: 401,
            msg: "El usuario no tiene permisos para esta accion"
        })
    }
    next();
}

module.exports = {
    isADMIN
}