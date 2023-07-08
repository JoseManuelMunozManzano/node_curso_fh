import { Router } from 'express';
import { body, param } from 'express-validator';

import { esAdminRol, validarCampos, validarJWT } from '../middlewares/index.js';

import { categoriaExistePorId } from '../helpers/db-validators.js';

import {
  actualizarCategoria,
  borrarCategoria,
  crearCategoria,
  obtenerCategoriaPorId,
  obtenerCategorias,
} from '../controllers/categorias.js';

export const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - público
router.get(
  '/',
  [
    param('limite', "El valor de 'limite' debe ser numérico").isNumeric().optional(),
    param('desde', "El valor de 'desde' debe ser numérico").isNumeric().optional(),
    validarCampos,
  ],
  obtenerCategorias
);

// Obtener una categoria por id - público
router.get(
  '/:id',
  [param('id', 'No es un ID válido').isMongoId(), param('id').custom(categoriaExistePorId), validarCampos],
  obtenerCategoriaPorId
);

// Crear categoría - privado - cualquier persona con un token válido
router.post(
  '/',
  [validarJWT, body('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos],
  crearCategoria
);

// Actualizar categoría - privado - cualquier persona con un token válido
router.put(
  '/:id',
  [
    validarJWT,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(categoriaExistePorId),
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar categoría - Admin
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    param('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    // Para evitar el error raro que sale indicando que se ha querido castear el id y no ha podido
    // se puede hacer dos veces el validar campos de esta forma, para que, si falla arriba, no llege
    // aquí, o si funcionó arriba y falla ahora, se vuelva a validarCampos.
    param('id').custom(categoriaExistePorId),
    validarCampos,
  ],
  borrarCategoria
);
