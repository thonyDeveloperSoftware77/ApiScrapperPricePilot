import {Router} from 'express';
import { deletefavorito,getfavoritos,postfavorito,putfavorito,getfavoritosJuego } from '../controllers/favorito';

const router = Router();

router.get('/:idUsuario', getfavoritos)
router.get('/juego/:idJuego', getfavoritosJuego)
router.post('/', postfavorito)
router.put('/:id', putfavorito)
router.delete('/:id', deletefavorito)





export default router;