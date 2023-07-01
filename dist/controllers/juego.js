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
exports.deleteJuego = exports.putJuego = exports.postJuego = exports.getJuego = exports.getJuegoNombre = exports.getJuegos = void 0;
const juego_1 = __importDefault(require("../models/juego"));
const sequelize_1 = require("sequelize");
const scrapper2_1 = require("../scrappers/scrapper2");
const scrapper3_1 = require("../scrappers/scrapper3");
const scrapper4_1 = require("../scrappers/scrapper4");
const scrapper5_1 = require("../scrappers/scrapper5");
const getJuegos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Juegos = yield juego_1.default.findAll();
    res.json({ Juegos });
});
exports.getJuegos = getJuegos;
const getJuegoNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    //BUSQUE EN SCRAPPER 2
    // Llamar al scrapper para obtener la información del juego
    const juegosScrapper2 = yield (0, scrapper2_1.miScrapper)(nombre);
    if (juegosScrapper2) {
        // Iterar sobre el arreglo de juegos obtenidos del scrapper
        for (const juegoScrapper of juegosScrapper2) {
            console.log(juegoScrapper);
            // Verificar si el juego obtenido del scrapper ya existe en la base de datos
            const juegoExistente = yield juego_1.default.findOne({ where: { nombre: juegoScrapper.nombre } });
            if (!juegoExistente) {
                // Si el juego no existe en la base de datos, hacer un post con la información obtenida del scrapper
                try {
                    const juego = yield juego_1.default.build(juegoScrapper);
                    yield juego.save();
                }
                catch (error) {
                    console.log(error);
                    throw new Error('Error al guardar el juego en la base de datos');
                }
            }
        }
    }
    //BUSQUEDA EN SCRAPPER 3
    // Llamar al scrapper para obtener la información del juego
    const juegosScrapper3 = yield (0, scrapper3_1.miScrapper3)(nombre);
    if (juegosScrapper3) {
        // Iterar sobre el arreglo de juegos obtenidos del scrapper
        for (const juegoScrapper of juegosScrapper3) {
            console.log(juegoScrapper);
            // Verificar si el juego obtenido del scrapper ya existe en la base de datos
            const juegoExistente = yield juego_1.default.findOne({ where: { nombre: juegoScrapper.nombre } });
            if (!juegoExistente) {
                // Si el juego no existe en la base de datos, hacer un post con la información obtenida del scrapper
                try {
                    const juego = yield juego_1.default.build(juegoScrapper);
                    yield juego.save();
                }
                catch (error) {
                    console.log(error);
                    throw new Error('Error al guardar el juego en la base de datos');
                }
            }
        }
    }
    //BUSQUEDA EN SCRAPPER 4
    // Llamar al scrapper para obtener la información del juego
    const juegosScrapper4 = yield (0, scrapper4_1.miScrapper4)(nombre);
    if (juegosScrapper4) {
        // Iterar sobre el arreglo de juegos obtenidos del scrapper
        for (const juegoScrapper of juegosScrapper4) {
            console.log(juegoScrapper);
            // Verificar si el juego obtenido del scrapper ya existe en la base de datos
            const juegoExistente = yield juego_1.default.findOne({ where: { nombre: juegoScrapper.nombre } });
            if (!juegoExistente) {
                // Si el juego no existe en la base de datos, hacer un post con la información obtenida del scrapper
                try {
                    const juego = yield juego_1.default.build(juegoScrapper);
                    yield juego.save();
                }
                catch (error) {
                    console.log(error);
                    throw new Error('Error al guardar el juego en la base de datos');
                }
            }
        }
    }
    //BUSQUEDA EN SCRAPPER 5
    // Llamar al scrapper para obtener la información del juego
    const juegosScrapper5 = yield (0, scrapper5_1.miScrapper5)(nombre);
    if (juegosScrapper5) {
        // Iterar sobre el arreglo de juegos obtenidos del scrapper
        for (const juegoScrapper of juegosScrapper5) {
            console.log(juegoScrapper);
            // Verificar si el juego obtenido del scrapper ya existe en la base de datos
            const juegoExistente = yield juego_1.default.findOne({ where: { nombre: juegoScrapper.nombre } });
            if (!juegoExistente) {
                // Si el juego no existe en la base de datos, hacer un post con la información obtenida del scrapper
                try {
                    const juego = yield juego_1.default.build(juegoScrapper);
                    yield juego.save();
                }
                catch (error) {
                    console.log(error);
                    throw new Error('Error al guardar el juego en la base de datos');
                }
            }
        }
    }
    const juegos = yield juego_1.default.findAll({ where: { nombre: { [sequelize_1.Op.like]: '%' + nombre + '%' } } });
    if (juegos) {
        res.json(juegos);
    }
    else {
        res.status(404).json({
            msg: `No existe un juego con el nombre ${nombre}`
        });
    }
});
exports.getJuegoNombre = getJuegoNombre;
const getJuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const juego = yield juego_1.default.findByPk(id);
    if (juego) {
        res.json(juego);
    }
    else {
        res.status(404).json({
            msg: `No existe un juego con el id ${id}`
        });
    }
});
exports.getJuego = getJuego;
const postJuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        if (Array.isArray(body)) {
            // Si el cuerpo de la petición es un array, guardar todos los juegos en la base de datos
            const juegos = yield juego_1.default.bulkCreate(body);
            res.json(juegos);
        }
        else {
            // Si el cuerpo de la petición es un objeto, guardar un solo juego en la base de datos
            const juego = yield juego_1.default.build(body);
            yield juego.save();
            res.json(juego);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postJuego = postJuego;
const putJuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const juego = yield juego_1.default.findByPk(id);
        if (!juego) {
            return res.status(404).json({
                msg: 'No existe un juego con el id ' + id
            });
        }
        yield juego.update(body);
        res.json(juego);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putJuego = putJuego;
const deleteJuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const juego = yield juego_1.default.findByPk(id);
    if (!juego) {
        return res.status(404).json({
            msg: 'No existe un juego con el id ' + id
        });
    }
    yield juego.destroy();
    res.json(juego);
});
exports.deleteJuego = deleteJuego;
//# sourceMappingURL=juego.js.map