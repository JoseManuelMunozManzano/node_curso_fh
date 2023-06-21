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

import { router } from '../routes/usuarios.js';
import { dbConnection } from '../database/config.js';

export class Server {
  constructor() {
    // Al crear una instancia de Server, vamos a crear la aplicación de express aquí como una propiedad
    // de la clase Server.
    this.app = express();
    // Una vez importado dotenv las variables de entorno son globales a toda la aplicación.
    this.port = process.env.PORT || 8080;
    // Es un poco difícil ver las rutas de la aplicación, por lo que se incluye aquí, para que otros
    // desarrolladores que vengan a ver mi servidor puedan ver las rutas disponibles.
    this.usuariosPath = '/api/usuarios';

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares: Funciones que añaden nueva funcionalidad a mi webserver
    this.middlewares();

    // Rutas de mi aplicación.
    this.routes();
  }

  async conectarDB() {
    // Aquí podría leerse de process.env una variable de entorno para saber si estamos en desarrollo o producción
    // y con un if crearnos otra conexión diferente.
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // ¿Cómo se recibe la información del body de una petición POST, PUT ...?
    // Hay que configurar un middleware para decir que la información que viene hacia el backend mediante una
    // petición POST, PUT o DELETE va a venir en formato JSON.
    // Si la información va a venir en XML... habrá que configurar otros middlewares, pero lo normal es comunicarnos con JSON.
    // Lectura y parseo del body.
    this.app.use(express.json());

    // Directorio público
    // Ahora para la ruta / se sirve index.html incluido en el directorio public.
    this.app.use(express.static('public'));
  }

  // Se va a separar las rutas del controlador.
  // Esto es porque puede que haya rutas que necesiten autenticación y se le podría aplicar un middleware a todas las rutas.
  // Y también para tener un archivo especial de rutas y otro de controladores de esas rutas por facilidad de mantenimiento.
  // Se crea el directorio routes para las rutas.
  routes() {
    // Middleware condicional para cargar las rutas.
    this.app.use(this.usuariosPath, router);
  }

  // Dejando listo el proyecto para desplegar en Railway.
  // Se ha indicado en package.json el script start y aquí indicamos el host 0.0.0.0
  listen() {
    this.app.listen(this.port, '0.0.0.0', () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
