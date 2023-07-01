"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorito_1 = require("../controllers/favorito");
const router = (0, express_1.Router)();
router.get('/:idUsuario', favorito_1.getfavoritos);
router.post('/', favorito_1.postfavorito);
router.put('/:id', favorito_1.putfavorito);
router.delete('/:id', favorito_1.deletefavorito);
exports.default = router;
//# sourceMappingURL=favorito.js.map