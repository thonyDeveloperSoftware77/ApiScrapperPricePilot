import dotenv from 'dotenv';
import Server from './models/server';
import miScrapper = require('./scrappers/scrapper2');
//Configurar dotenv
dotenv.config();

const server = new Server();

server.listen();