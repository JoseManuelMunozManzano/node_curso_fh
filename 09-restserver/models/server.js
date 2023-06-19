// Express basado en clases, para organizarlo todo mejor.
import express from 'express';
// Para que solo ciertas páginas, o todo el mundo porque se va a proteger de cierta manera, puedan acceder a mi API
// instalaremos un paquete llamado cors.
// Básicamente cors (cross-origin access record) permite proteger nuestro servidor de una manera superficial.
// No es muy útil configurar CORS si la API está en la red interna de la empresa, es decir, no se expone al exterior.
// Se pueden crear listas blancas para dar acceso a nuestro endpoint desde esas urls.
// Indicar que Postman se salta el CORS, por lo que para probar que CORS está configurado habría que hacer una petición
// desde el front de React o Angular...
// https://www.npmjs.com/package/cors
import cors from 'cors';

export class Server {
  constructor() {
    // Al crear una instancia de Server, vamos a crear la aplicación de express aquí como una propiedad
    // de la clase Server.
    this.app = express();
    // Una vez importado dotenv las variables de entorno son globales a toda la aplicación.
    this.port = process.env.PORT || 8080;

    // Middlewares: Funciones que añaden nueva funcionalidad a mi webserver
    this.middlewares();

    // Rutas de mi aplicación.
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio público
    // Ahora para la ruta / se sirve index.html incluido en el directorio public.
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      // Devolviendo json en vez de text. Se suele mandar un objeto.
      // Para mandar también un status de error sería: res.status(403).json({})
      res.json({
        msg: 'get API',
      });
    });

    this.app.put('/api', (req, res) => {
      res.json({
        msg: 'put API',
      });
    });

    this.app.post('/api', (req, res) => {
      res.status(201).json({
        msg: 'post API',
      });
    });

    this.app.delete('/api', (req, res) => {
      res.json({
        msg: 'delete API',
      });
    });

    this.app.patch('/api', (req, res) => {
      res.json({
        msg: 'patch API',
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
