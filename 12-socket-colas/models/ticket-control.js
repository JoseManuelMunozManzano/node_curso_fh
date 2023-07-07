// Para importar módulos JSON.
// Es una función experimental de Node y puede cambiar en el futuro.
import json from '../db/data.json' assert { type: 'json' };

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Sirve para que todos los tickets luzcan igual.
class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

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

  siguiente() {
    this.ultimo += 1;
    // El ticket no tendrá asignado un escritorio en este momento.
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDB();
    return 'Ticket ' + ticket.numero;
  }

  atenderTicket(escritorio) {
    // No tenemos tickets
    if (this.tickets.length === 0) {
      return null;
    }

    // Asocio el ticket al escritorio
    const ticket = this.tickets.shift(); //this.tickets[0];
    ticket.escritorio = escritorio;

    // Lo añado al principio de los últimos 4 que se ven
    this.ultimos4.unshift(ticket);

    // Verificamos que sean 4 y borro a partir del 5.
    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(4);
    }

    this.guardarDB();

    return ticket;
  }
}
