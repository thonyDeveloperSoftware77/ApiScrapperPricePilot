"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletefavorito = exports.putfavorito = exports.postfavorito = exports.getfavoritosJuego = exports.getfavoritos = void 0;
const favoritos_1 = __importDefault(require("../models/favoritos"));
const juego_1 = __importDefault(require("../models/juego"));
const getfavoritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario } = req.params;
    const favoritos = yield favoritos_1.default.findAll({
        where: {
            idUsuario,
        },
        attributes: {
            exclude: ['idUsuario', 'idJuego']
        },
        include: [{
                model: juego_1.default,
                as: 'Juego'
            }]
    });
    if (favoritos.length > 0) {
        res.json({ favoritos });
    }
    else {
        res.status(404).json({
            msg: `No existen favoritos para el usuario con el id ${idUsuario}`
        });
    }
});
exports.getfavoritos = getfavoritos;
const getfavoritosJuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idJuego } = req.params;
    const favoritos = yield favoritos_1.default.findAll({
        where: {
            idJuego,
        },
        attributes: {
            exclude: ['idUsuario', 'idJuego', 'id']
        },
        include: [{
                model: juego_1.default,
                as: 'Juego'
            }]
    });
    if (favoritos.length > 0) {
        res.json({ favoritos });
    }
    else {
        res.status(404).json({
            msg: `No existen favoritos para el juego con el id ${idJuego}`
        });
    }
});
exports.getfavoritosJuego = getfavoritosJuego;
const postfavorito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeFavorito = yield favoritos_1.default.findOne({
            where: {
                idUsuario: body.idUsuario,
                idJuego: body.idJuego,
            },
        });
        if (existeFavorito) {
            return res.status(400).json({
                msg: `Ya existe un juego en favoritos con id ${body.idJuego} para el usuario con id ${body.idUsuario}`,
            });
        }
        const favorito = yield favoritos_1.default.build(body);
        yield favorito.save();
        res.json(favorito);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postfavorito = postfavorito;
const putfavorito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const favorito = yield favoritos_1.default.findByPk(id);
        if (!favorito) {
            return res.status(404).json({
                msg: 'No existe un favorito con el id ' + id
            });
        }
        yield favorito.update(body);
        res.json(favorito);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putfavorito = putfavorito;
const deletefavorito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const favorito = yield favoritos_1.default.findByPk(id);
    if (!favorito) {
        return res.status(404).json({
            msg: 'No existe un favorito con el id ' + id
        });
    }
    yield favorito.destroy();
    res.json(favorito);
});
exports.deletefavorito = deletefavorito;
//# sourceMappingURL=favorito.js.map