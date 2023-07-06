export const socketController = (socket) => {
  console.log('Cliente conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente Desconectado', socket.id);
  });

  // Escuchando
  socket.on('enviar-mensaje', (payload, callback) => {
    const id = 123456789;
    // callback({ id, fecha: new Date().getTime() });
    callback(id);

    // Este emit funciona parecido al callback y solo envía al cliente que emitió el mensaje.
    //socket.emit('enviar-mensaje', payload);

    // Para emitir a todos los clientes conectados, salvo al que emite el mensaje, que total, ya lo tiene porque lo emitió.
    socket.broadcast.emit('enviar-mensaje', payload);
  });
};
