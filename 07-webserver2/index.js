import express from 'express';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();
const port = 8080;

// Al pulsar en el menú de hamburguesa y luego en Generic, la url es
// http://localhost:8080/generic.html
// Para que al pulsar en un enlace de esta página no aparezca el .html, es decir, que funcione:
// http://localhost:8080/generic
// Hay dos formas:
// 1 - Forma fea: Crear dentro del directorio public el directorio generic y dentro su index.html.
//     Hay que hacer muchos cambios porque todos los path de las imágenes, del css, cambiarían.
//
// 2 - Añadir extensions al middleware. De esta forma, si informamos en el navegador la ruta
//     http://localhost:8080/generic funciona, pero si pulsamos el enlace en la web seguimos
//     viendo http://localhost:8080/generic.html
//     Para solucionar esto hay que cambiar los tags <a> de los html para que apunten a /, /generic y /elements
//
app.use(express.static(__dirname + '/public', { extensions: ['html', 'htm'] }));
//
// 3 - Hacer sendFile en función de la ruta.
//     También hay que tocar los tags <a> de los html
//
// app.use(express.static(__dirname + '/public'));

// app.get('/generic', (req, res) => {
//   res.sendFile(__dirname + '/public/generic.html');
// });

// app.get('/elements', (req, res) => {
//   res.sendFile(__dirname + '/public/elements.html');
// });

app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
});
