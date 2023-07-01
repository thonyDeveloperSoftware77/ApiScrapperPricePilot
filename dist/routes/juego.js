"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const juego_1 = require("../controllers/juego");
const router = (0, express_1.Router)();
router.get('/', juego_1.getJuegos);
router.get('/:nombre', juego_1.getJuegoNombre);
router.get('/:id', juego_1.getJuego);
router.post('/', juego_1.postJuego);
router.put('/:id', juego_1.putJuego);
router.delete('/:id', juego_1.deleteJuego);
exports.default = router;
//# sourceMappingURL=juego.js.map