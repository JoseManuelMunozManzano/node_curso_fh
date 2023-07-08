import { Router } from 'express';
import { body, param, query } from 'express-validator';

import { esAdminRol, tieneRol, validarCampos, validarJWT } from '../middlewares/index.js';

import { emailExiste, esRolValido, usuarioExistePorId } from '../helpers/db-validators.js';

import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/usuarios.js';

// Es a este router al que se le van a configurar las rutas.
export const router = Router();

// Aquí deben estar solo las rutas y su protección.
// To-do el controlador debe estar en un archivo independiente para controlar dicha función.
// Ver directorio controllers.
//
// NOTA: NO se ejecuta la función, no hay paréntesis. Se está mandando la referencia.
router.get(
  '/',
  // Validaciones sobre query parameters
  [
    param('limite', "El valor de 'limite' debe ser numérico").isNumeric().optional(),
    param('desde', "El valor de 'desde' debe ser numérico").isNumeric().optional(),
    validarCampos,
  ],
  usuariosGet
);

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
router.post(
  '/',
  [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'El password debe de ser de más de 6 letras').isLength({ min: 6 }),
    body('correo', 'El correo no es válido').isEmail(),
    body('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // Evaluando rol cuando viene de BD. Es una validación personalizada.
    body('rol').custom(esRolValido), // Esto es lo mismo que: check('rol').custom((rol) => esRolValido(rol)),
    // Este middleware va a final. Cuando tengo todas las validaciones del check hechas, reviso los errores.
    validarCampos,
  ],
  usuariosPost
);

// Obtener parámetros de segmento
// Ejemplo: http://localhost:8080/api/usuarios/10
// El parámetro de segmento del ejemplo es el 10
//
// Para obtenerlo de forma dinámica indicamos con dos puntos la variable que obtendrá ese valor.
// En nuestra ruta ya hemos configurado para Express la varible id. Express lo parsea y lo da
// en una propiedad de los params del objeto request.
router.put(
  '/:id',
  // Validaciones a la hora de hacer put
  [
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(usuarioExistePorId),
    body('rol').custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.patch('/', usuariosPatch);

// Vamos a proteger esta ruta para que no pueda ejecutarse si no tenemos un token.
// Esto se hace con un middleware personalizado, y lo ponemos a ejecutar el primero porque si
// da error ya no queremos que siga ejecutando nada más.
//
// Se añade middleware para validar que la persona que quiere borrar tenga que tener el rol de administrador.
//
// NOTA: Se cambia check() por body(), cookies(), header(), param() o query() según proceda
// porque se indica que check() puede ser inseguro.
router.delete(
  '/:id',
  [
    validarJWT,
    // esAdminRol,
    // Cambiamos que el usuario tenga rol de admnistrador a que cualquier usuario con este tipo de rol
    // pueda ejecutar el delete.
    //
    // COMO RECIBIR ARGUMENTOS EN MIDDLEWARES
    // Esta función tiene que regresar otra función que se va a ejecutar cuando alguien pase por el middleware tieneRol()
    //
    // Es decir, el arreglo de middlewares espera que le pasemos una función.
    // Si nuestra función no necesita argumentos, lo ideal sería únicamente mandar la referencia ya que no necesitamos que se
    // ejecute justo en el momento que se interpreta el archivo, sino únicamente cuando llamen a la ruta (ej: validarJWT arriba)
    // Sin embargo, si nuestra función requiere argumentos, necesitarás llamarla para poder pasárselos, pero como el arreglo de
    // middlewares está esperando una función, tendrás que tener esto en cuenta y hacer el return de toda una función, como
    // hacemos aquí en tieneRol
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(usuarioExistePorId),
    validarCampos,
  ],
  usuariosDelete
);
