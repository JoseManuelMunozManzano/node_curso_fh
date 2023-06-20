import { Router } from 'express';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/usuarios.js';

// Es a este router al que se le van a configurar las rutas.
export const router = Router();

// Aquí deben estar solo las rutas y su protección.
// To-do el controlador debe estar en un archivo independiente para controlar dicha función.
// Ver directorio controllers.
//
// NOTA: NO se ejecuta la función, no hay paréntesis. Se está mandando la referencia.
router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);
