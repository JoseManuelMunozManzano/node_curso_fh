import 'dotenv/config';

import { Server } from './models/server.js';

// Creando instancia de Server
const server = new Server();

// Para escuchar.
server.listen();
