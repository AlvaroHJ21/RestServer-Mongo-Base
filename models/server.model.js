const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { dbConecction } = require("../database/config.database");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

        /**
         * CONEXION A LA BD
         */
        this.conectarDB();

        /**
         * MIDLEWARES
         * Agregamos los middlewares, que darán otras funciones al webserver
         */
        this.middlewares();

        /**
         * RUTAS DE MI APLICACIÓN
         */
        this.routes();
    }

    async conectarDB() {
        await dbConecction();
    }

    middlewares() {
        /**
         * CORS
         */
        this.app.use(cors());

        /**
         * LECTURA Y PARSEO DE BODY
         */
        this.app.use(express.json());

        /**
         * HABILITAR BODY PARSER para leer datos de formularios
         */
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/user.routes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto " + this.port);
        });
    }
}

module.exports = Server;
