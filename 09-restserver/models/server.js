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
    // Se cambia la ruta para que se vea algo, ya que la ruta / la coge de index.html del directorio public.
    this.app.get('/api', (req, res) => {
      res.send('Hello World');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
