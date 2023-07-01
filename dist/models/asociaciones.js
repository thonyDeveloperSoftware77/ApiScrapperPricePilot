"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("./usuario"));
const favoritos_1 = __importDefault(require("./favoritos"));
const juego_1 = __importDefault(require("./juego"));
usuario_1.default.hasOne(favoritos_1.default, { foreignKey: 'idUsuario' });
favoritos_1.default.belongsTo(usuario_1.default, { foreignKey: 'idUsuario' });
favoritos_1.default.belongsTo(juego_1.default, { foreignKey: 'idJuego' });
juego_1.default.hasMany(favoritos_1.default, { foreignKey: 'idJuego' });
//# sourceMappingURL=asociaciones.js.map