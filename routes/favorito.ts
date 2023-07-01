import {Router} from 'express';
import { deletefavorito,getfavoritos,postfavorito,putfavorito } from '../controllers/favorito';

const router = Router();

router.get('/:idUsuario', getfavoritos)
router.post('/', postfavorito)
router.put('/:id', putfavorito)
router.delete('/:id', deletefavorito)





export default router;