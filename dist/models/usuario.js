"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('Usuario', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    fechaNacimiento: {
        type: sequelize_1.DataTypes.DATE
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    timestamps: false // desactivar la generación automática de createdAt y updatedAt
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map