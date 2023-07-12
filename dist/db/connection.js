"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
//Configuración de las variables de entorno
dotenv_1.default.config();
const db = new sequelize_1.Sequelize('Scrapper', process.env.USER_DATABASE || '', process.env.PASSWORD_DATABASE || '', {
    host: 'scrapper.database.windows.net',
    dialect: 'mssql',
});
exports.default = db;
//# sourceMappingURL=connection.js.map