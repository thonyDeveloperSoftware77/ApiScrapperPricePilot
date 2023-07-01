"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Juego = connection_1.default.define('Juego', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    precio: {
        type: sequelize_1.DataTypes.FLOAT
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    },
    link: {
        type: sequelize_1.DataTypes.STRING
    },
    page: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    timestamps: false // desactivar la generación automática de createdAt y updatedAt
});
exports.default = Juego;
//# sourceMappingURL=juego.js.map