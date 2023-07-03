// La subida de archivos no deja de ser otra ruta.
//
// Se instala un paquete que se usa para cargar archivos y se dejan en la carpeta uploads del proyecto.
// https://www.npmjs.com/package/express-fileupload
import { Router } from 'express';
import { body } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';

import { cargarArchivo } from '../controllers/uploads.js';

export const router = Router();

// La subida de archivos se suele hacer con un post.
router.post('/', cargarArchivo);
