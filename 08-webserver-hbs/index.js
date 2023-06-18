// Instalación de Handlebars para pre-renderizar las vistas en el backed y que Express las mande como respuesta
// a los respectivos endpoints.
// Se suele usar para páginas sencillas, dejando la creación de apps a Angular/React/Vue
// https://github.com/pillarjs/hbs
//
// La idea de Handlebars es tener separado las vistas, el modelo y el controlador, patrón MVC.
// La ventaja que aporta Handlebars es que partes que se utilizan mucho, como el head, el footer, el nav,
// podemos aislarlas en sus propios ficheros y reutilizarlas.
// Y luego, al ser dinámico, podemos trabajar con variables, bloques if, do...
import express from 'express';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();
const port = 8080;

// Diciendo a Express que voy a usar Handlebars
// Para usar la configuración por defecto, tenemos que crear una carpeta llamadas views en la raiz.
// Ahí es donde buscará las vistas Handlebars.
app.set('view engine', 'hbs');

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
  res.sendFile(__dirname + '/public/generic.html');
});

app.get('/elements', (req, res) => {
  res.sendFile(__dirname + '/public/elements.html');
});

app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
});
