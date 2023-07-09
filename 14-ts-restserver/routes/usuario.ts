import { Router } from 'express';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuario.js';

const router = Router();

// Indicar que aquí no se están haciendo validaciones.
// Como es lo mismo que ya hemos hecho en proyectos anteriores se deja así.
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

export default router;
