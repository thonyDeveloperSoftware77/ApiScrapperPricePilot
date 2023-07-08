import dotenv from "dotenv";
import { Sequelize } from "sequelize";

//Configuración de las variables de entorno
dotenv.config();

const db = new Sequelize('Scrapper', process.env.USER_DATABASE ||'', process.env.PASSWORD_DATABASE || '',{
    host: 'localhost',
    dialect: 'mssql',
    
});


export default db;