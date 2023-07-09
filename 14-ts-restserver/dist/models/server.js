var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// No olvidar instalar la declaración de tipos!!
// npm i --save-dev @types/express
// Ayuda a TypeScript a saber cuáles son las firmas de cada una de las funciones...
// Esto no irá en producción porque la instalación es para desarrollo.
import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/usuario.js';
import db from '../db/connection.js';
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
        };
        this.app = express();
        this.port = process.env.PORT || '8000';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // La BD tiene que estar creada para poder crear modelos basados en esta conexión.
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.authenticate();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(String(error));
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura del body (parseo)
        this.app.use(express.json());
        // Carpeta pública
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}
export default Server;
//# sourceMappingURL=server.js.map