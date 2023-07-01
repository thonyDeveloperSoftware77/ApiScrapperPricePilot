import {Router} from 'express';
import  { deleteJuego, getJuegos,getJuegoNombre , getJuego, postJuego, putJuego } from '../controllers/juego';

const router = Router();

router.get('/', getJuegos)
 router.get('/:nombre', getJuegoNombre)
router.get('/:id', getJuego)
router.post('/', postJuego)
router.put('/:id', putJuego)
router.delete('/:id', deleteJuego)

export default router;