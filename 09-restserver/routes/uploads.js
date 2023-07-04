// La subida de archivos no deja de ser otra ruta.
//
// Se instala un paquete que se usa para cargar archivos y se dejan en la carpeta uploads del proyecto.
// https://www.npmjs.com/package/express-fileupload
import { Router } from 'express';
import { param } from 'express-validator';

import { coleccionesPermitidas } from '../helpers/db-validators.js';
import { validarArchivoSubir, validarCampos } from '../middlewares/index.js';

import {
  // actualizarArchivo,
  actualizarArchivoCloudinary,
  cargarArchivo,
  mostrarImagen,
} from '../controllers/uploads.js';

export const router = Router();

// La subida de archivos se suele hacer con un post.
router.post('/', validarArchivoSubir, cargarArchivo);

// Actualizar la imagen de usuario o producto.
router.put(
  '/:coleccion/:id',
  [
    validarArchivoSubir,
    param('id', 'El id debe de ser de Mongo').isMongoId(),
    param('coleccion').custom((c) => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    // También era posible esto en vez de la validación personalizada.
    //param('coleccion', 'No es una colección permitida').isIn(['usuarios', 'productos']),
    validarCampos,
  ],
  // Cambiamos esta por la de Cloudinary
  // actualizarArchivo
  actualizarArchivoCloudinary
);

router.get(
  '/:coleccion/:id',
  [
    param('id', 'El id debe de ser de Mongo').isMongoId(),
    param('coleccion').custom((c) => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos,
  ],
  mostrarImagen
);
