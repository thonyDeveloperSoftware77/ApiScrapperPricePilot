"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Favoritos = connection_1.default.define('Favoritos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idUsuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        references: {
            model: 'Usuario',
            key: 'id',
        }
    },
    idJuego: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
            model: 'Juego',
            key: 'id',
        }
    },
}, {
    tableName: 'Favoritos',
    timestamps: false // desactivar la generación automática de createdAt y updatedAt
});
exports.default = Favoritos;
//# sourceMappingURL=favoritos.js.map