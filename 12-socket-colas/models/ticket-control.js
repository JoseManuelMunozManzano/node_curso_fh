// Para importar módulos JSON.
// Es una función experimental de Node y puede cambiar en el futuro.
import json from '../db/data.json' assert { type: 'json' };

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate(); // El día de hoy
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    const { hoy, tickets, ultimo, ultimos4 } = json;

    // Por si hay una caída.
    // Si estamos trabajando en el mismo día puedo recargar el servidor con la info que tenía en el JSON.
    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      // Si es otro día
      this.guardarDB();
    }
  }

  guardarDB() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }
}
