import { Router } from 'express';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/usuarios.js';
import { check } from 'express-validator';

// Es a este router al que se le van a configurar las rutas.
export const router = Router();

// Aquí deben estar solo las rutas y su protección.
// To-do el controlador debe estar en un archivo independiente para controlar dicha función.
// Ver directorio controllers.
//
// NOTA: NO se ejecuta la función, no hay paréntesis. Se está mandando la referencia.
router.get('/', usuariosGet);

// Se instala express-validator para realizar validaciones.
// npm i express-validator
// Es una gran colección de middlewares que se pueden usar antes de disparar el controlador de usuarios.post
//
// Arreglo de middlewares para validar datos.
// Si solo fuera un middleware no usaríamos el arreglo, sería llamada directa.
// router.post('/', mi_middleware, usuariosPost);
//
// check es un método de express-validator al que indico que campo del body quiero validar
// y el error que mando si no se valida, es decir, el isEmail()
//
// Las validaciones que no se cumplan se van almacenando y en mi controlador saltan.
// NOTA: Se pueden hacer validaciones personalizadas contra BD y las haremos más adelante.
router.post('/', [check('correo', 'El correo no es válido').isEmail()], usuariosPost);

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
