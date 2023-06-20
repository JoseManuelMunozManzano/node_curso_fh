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

// Obtener parámetros de segmento
// Ejemplo: http://localhost:8080/api/usuarios/10
// El parámetro de segmento del ejemplo es el 10
//
// Para obtenerlo de forma dinámica indicamos con dos puntos la variable que obtendrá ese valor.
// En nuestra ruta ya hemos configurado para Express la varible id. Express lo parsea y lo da
// en una propiedad de los params del objeto request.
router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);
