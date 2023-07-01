import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import juegoRoutes from '../routes/juego';
import favoritosRoutes from '../routes/favorito';
import cors from 'cors'
import db from '../db/connection';

//IMPORTACIONES DE LAS ASOCIACIONES
require('./asociaciones');
class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        juegos: '/api/juegos',
        favoritos: '/api/favoritos'
    }


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '9000';
        
        //Conectar a base de datos
        this.dbConexion();
        //Definir mis middlewares
        this.middlewares();
        //Definir mis rutas
        this.routes();
    }


    async dbConexion() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
           console.log(error);
        }

    }


    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());

        
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes),
        this.app.use(this.apiPaths.juegos, juegoRoutes),
        this.app.use(this.apiPaths.favoritos, favoritosRoutes)
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

export default Server;