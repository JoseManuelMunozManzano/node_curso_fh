// Express basado en clases, para organizarlo todo mejor.
import express from 'express';

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
    // Directorio público
    // Ahora para la ruta / se sirve index.html incluido en el directorio public.
    console.log(this.__dirname);
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
      res.json({
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
