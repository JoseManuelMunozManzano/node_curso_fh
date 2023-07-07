import { TicketControl } from '../models/ticket-control.js';

// Instancia única cada vez que se reinicialice el backend.
const ticketControl = new TicketControl();

export const socketController = (socket) => {
  // Solo a la persona que se conecta (no es broadcast)
  socket.emit('ultimo-ticket', ticketControl.ultimo);
  socket.emit('estado-actual', ticketControl.ultimos4);
  socket.emit('tickets-pendientes', ticketControl.tickets.length);

  // El payload no lo voy a usar.
  // En el callback le voy a enviar cual es el ticket que tiene que mostrar.
  socket.on('siguiente-ticket', (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);

    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
  });

  socket.on('atender-ticket', ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio',
      });
    }

    const ticket = ticketControl.atenderTicket(escritorio);

    socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
    // Para que llegue al usuario que se conecta y a los demás uso los eventos emit y broadcast.emit.
    // Otra opción es pasar a socketController la referencia al servidor de io.
    socket.emit('tickets-pendientes', ticketControl.tickets.length);
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: 'Ya no hay tickets pendientes',
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};
