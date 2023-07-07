import { TicketControl } from '../models/ticket-control.js';

const ticketControl = new TicketControl();

export const socketController = (socket) => {
  socket.on('enviar-mensaje', (payload, callback) => {
    const id = 123456789;
    callback(id);

    socket.broadcast.emit('enviar-mensaje', payload);
  });
};
