// https://www.npmjs.com/package/express
// https://expressjs.com/
import express from 'express';

const app = express();
const port = 8080;

// Validación automática: Si la ruta de la request no existe, Express genera automáticamente una excepción.
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/hola-mundo', (req, res) => {
  res.send('Hola mundo en su respectiva ruta');
});

// Ruta comodín en caso de que no encuente ningún manejador para la ruta.
app.get('*', (req, res) => {
  res.send('404 | Page Not Found');
});

app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
});

// NOTA: No queremos que todo esté en un solo archivo.
// Hay que separar en carpetas para que sea más fácil de trabajar.
