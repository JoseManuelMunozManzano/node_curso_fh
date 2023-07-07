import { TicketControl } from '../models/ticket-control.js';

// Instancia única cada vez que se reinicialice el backend.
const ticketControl = new TicketControl();

export const socketController = (socket) => {
  // Solo a la persona que se conecta (no es broadcast)
  socket.emit('ultimo-ticket', ticketControl.ultimo);

  // El payload no lo voy a usar.
  // En el callback le voy a enviar cual es el ticket que tiene que mostrar.
  socket.on('siguiente-ticket', (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);

    // TODO: Notificar que hay un nuevo ticket pendiente de asignar
  });
};
