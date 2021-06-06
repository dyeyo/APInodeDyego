require('dotenv').config()
const express = require('express')
const { dbConnection } = require('../db/config')
// const cors = require('cors')
const routerUser = require('../routes/user.router')
const routerAuth = require('../routes/auth.router')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.userRoutePath = '/api/user';
        this.authPath = '/api/auth';

        //conectar a db
        this.coneccionDB()
        //middelwares
        this.middelwares()
        //rutas
        this.routes()
    }

    async coneccionDB() {
        await dbConnection();
    }

    middelwares() {
        // this.app.use(cors())
        //Lectura y parseo del body
        this.app.use(express.json())
        //Load directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.userRoutePath, routerUser)
        this.app.use(this.authPath, routerAuth)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run in port ${this.port}`);
        })
    }
}

module.exports = Server