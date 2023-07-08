import { Router } from 'express';

import { body, param } from 'express-validator';

import { esAdminRol, validarCampos, validarJWT } from '../middlewares/index.js';

import { categoriaExistePorId, productoExistePorId } from '../helpers/db-validators.js';

import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProductoPorId,
  obtenerProductos,
} from '../controllers/productos.js';

export const router = Router();

/**
 * {{url}}/api/productos
 */

// Obtener todos los productos - público
router.get(
  '/',
  [
    param('limite', "El valor de 'límite' debe ser numérico").isNumeric().optional(),
    param('desde', "El valor de 'desde' debe ser numérico").isNumeric().optional(),
    validarCampos,
  ],
  obtenerProductos
);

// Obtener un producto por id - público
router.get(
  '/:id',
  [param('id', 'No es un ID válido').isMongoId(), param('id').custom(productoExistePorId), validarCampos],
  obtenerProductoPorId
);

// Crear un producto - privado - cualquier persona con un token válido
router.post(
  '/',
  [
    validarJWT,
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('precio', 'El precio debe ser mayor/igual a 0').isNumeric().optional(),
    body('categoria', 'No es un id de Mongo válido').isMongoId(),
    body('categoria').custom(categoriaExistePorId),
    body('disponible', 'Valores posibles true o false').isBoolean().optional(),
    validarCampos,
  ],
  crearProducto
);

// Actualizar producto - privado - cualquier persona con un token válido
router.put(
  '/:id',
  [
    validarJWT,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(productoExistePorId),
    body('categoria', 'No es un id de Mongo válido').optional().isMongoId(),
    body('categoria').optional().custom(categoriaExistePorId),
    body('precio', 'El precio debe ser mayor/igual a 0').isNumeric().optional(),
    body('disponible', 'Valores posibles true o false').isBoolean().optional(),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar producto - Admin
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(productoExistePorId),
    validarCampos,
  ],
  borrarProducto
);
