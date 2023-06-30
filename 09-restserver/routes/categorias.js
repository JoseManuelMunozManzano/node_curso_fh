import { Router } from 'express';
import { body } from 'express-validator';

import { validarCampos, validarJWT } from '../middlewares/index.js';

import { crearCategoria } from '../controllers/categorias.js';

export const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - público
router.get('/', (req, res) => {
  res.json('get');
});

// Obtener una categoria por id - público
router.get('/:id', (req, res) => {
  res.json('get - id');
});

// Crear categoría - privado - cualquier persona con un token válido
router.post(
  '/',
  [validarJWT, body('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos],
  crearCategoria
);

// Actualizar categoría - privado - cualquier persona con un token válido
router.put('/:id', (req, res) => {
  res.json('put');
});

// Borrar categoría - Admin
router.delete('/:id', (req, res) => {
  res.json('delete');
});
