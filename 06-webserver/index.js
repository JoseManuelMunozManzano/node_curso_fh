// https://www.npmjs.com/package/express
// https://expressjs.com/
import express from 'express';

// Con módulos, __dirname no está definido. Pasa lo mismo con __filename, exports, module y require.
// https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
// https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_filename_or_dirname
// Para poder trabajar con ellos:
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = 8080;

// Servir contenido estático.
//
// Se ha creado la carpeta public (suele tener ese nombre), que contiene contenido estático y público.
// Para cualquier persona que entre a la ruta se le servirá ese contenido.
// Para decirle a mi aplicación de Express que ese directorio es público hay que ejecutar el siguiente
// middleware. Más adelante se verán que son, pero en plan rápido, indicar que son funciones que se
// ejecutan antes que el resto.
//
// Indicar que como este es el path del /, no se está ejecutando el get del / y se ha borrado.
// Para sustituir la ruta /hola-mundo por contenido estático, habría que crear dentro de public la carpeta
// hola-mundo con su index.html.
// Es decir, la parte de la carpeta pública tiene prioridad sobre las rutas que estamos definiendo.
// Si no hay contenido estático va a ejecutar los app.get respectivos.
app.use(express.static(__dirname + '/public'));

// Validación automática: Si la ruta de la request no existe, Express genera automáticamente una excepción.
app.get('/hola-mundo', (req, res) => {
  res.send('Hola mundo en su respectiva ruta');
});

// Ruta comodín en caso de que no encuente ningún manejador para la ruta.
app.get('*', (req, res) => {
  // res.send('404 | Page Not Found');

  // Puedo mandar algo que se encuentre en la ruta pública.
  // El path debe ser absoluto, por lo que se usa __dirname.
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
});

// NOTA: No queremos que todo esté en un solo archivo.
// Hay que separar en carpetas para que sea más fácil de trabajar.
