// Con el paquete nativo http se puede crear un servidor web.
// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
// No es obligatiorio, si recomendable, usar Express.
//
// Esto es más que nada para conocer que Node proporciona su paquete para crear un webserver.
import http from 'http';

http
  .createServer((req, res) => {
    res.write('Hola Mundo');

    // Tenemos que decirle a Node que ya hemos terminado de escribr nuestra respuesta.
    res.end();
  })
  // Puerto donde se levanta la aplicación
  .listen(8080, () => {
    console.log('Escuchando el puerto', 8080);
  });
