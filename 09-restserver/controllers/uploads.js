import { response } from 'express';
import { subirArchivo } from '../helpers/index.js';

// en req.files aparecen los ficheros que se han mandado en el body de la petición post.
// Para añadir al body un fichero en Postman, usar body y form-data.
// console.log(req.files);
export const cargarArchivo = async (req, res = response) => {
  // Estamos esperando que nos manden un file en una propiedad llamada archivo.
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: 'No hay archivos que subir' });
    return;
  }

  // Imágenes
  const nombre = await subirArchivo(req.files);

  res.json({
    nombre,
  });
};
