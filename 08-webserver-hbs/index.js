// Instalación de Handlebars para pre-renderizar las vistas en el backed y que Express las mande como respuesta
// a los respectivos endpoints.
// Se suele usar para páginas sencillas, dejando la creación de apps a Angular/React/Vue
// https://github.com/pillarjs/hbs
//
// La idea de Handlebars es tener separado las vistas, el modelo y el controlador, patrón MVC.
// La ventaja que aporta Handlebars es que partes que se utilizan mucho, como el head, el footer, el nav,
// podemos aislarlas en sus propios ficheros y reutilizarlas.
// Esto se llama partials.
// Y luego, al ser dinámico, podemos trabajar con variables, bloques if, do...
import 'dotenv/config';
import * as url from 'url';
import express from 'express';
import hbs from 'hbs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();

// Las dos cosas necesarias para poder desplegar las aplicaciones en un hosting son:
//
// 1. El puerto debe estar en una varible de entorno porque el hosting decidirá el puerto de despliegue.
//    Para ello instalar dotenv:
//    npm i dotenv y crear archivo .env en la raiz.
//    En este caso se ha llamado PORT a esta variable de entorno
// 2. En package.json crear el script start para que ejecute node index.js, o como se llame la app.
//    No usar nodemon porque si cambia algo se reinicia la app.
const port = process.env.PORT || 8080;

// Diciendo a Express que voy a usar Handlebars
// Para usar la configuración por defecto, tenemos que crear una carpeta llamadas views en la raiz.
// Ahí es donde buscará las vistas Handlebars.
app.set('view engine', 'hbs');

// Tenemos que registrar el directorio donde estan los partials.
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // Para renderizar vistas se usa el método render.
  // En este caso se está renderizando la vista situada en /views/home.hbs
  //
  // Mandar argumentos desde el controlador para renderizar la vista.
  // Ver como se atrapan estos argumentos en /views/home.hbs
  res.render('home', {
    nombre: 'José Manuel',
    titulo: 'Práctica de Node',
  });
});

app.get('/generic', (req, res) => {
  res.render('generic', {
    nombre: 'José Manuel',
    titulo: 'Práctica de Node',
  });
});

app.get('/elements', (req, res) => {
  res.render('elements', {
    nombre: 'José Manuel',
    titulo: 'Práctica de Node',
  });
});

app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
});
