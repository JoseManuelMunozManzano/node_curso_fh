import { response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// en req.files aparecen los ficheros que se han mandado en el body de la petición post.
// Para añadir al body un fichero en Postman, usar body y form-data.
// console.log(req.files);
//
// Aunque se puede enviar más de un archivo es normal dejar subir solo uno, porque en el front
// podría haber algún tipo de drag and drop.
//
// De esta url de github he ido a la carpeta example para ver un ejemplo y copiado lo que se
// encuentra dentro de la petición post del archivo server.js
// https://github.com/richardgirges/express-fileupload#readme
export const cargarArchivo = (req, res = response) => {
  // Estamos esperando que nos manden un file en una propiedad llamada archivo.
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: 'No hay archivos que subir' });
    return;
  }

  const { archivo } = req.files;

  // Validando las extensiones de los archivos.
  const nombreCortado = archivo.name.split('.');
  const extension = nombreCortado[nombreCortado.length - 1];
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      msg: `La extensión ${extension} no es permitida, ${extensionesValidas}`,
    });
  }

  res.json({ extension });

  // const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

  // archivo.mv(uploadPath, (err) => {
  //   if (err) {
  //     // Los internal server errors hay que ponerlos en consola y mandarlos al front.
  //     console.log(err);
  //     return res.status(500).json({ err });
  //   }

  //   res.json({ msg: 'File uploaded to ' + uploadPath });
  // });
};
