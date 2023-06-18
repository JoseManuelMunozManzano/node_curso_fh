// Con el paquete nativo http se puede crear un servidor web.
// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
// No es obligatorio, si recomendable, usar Express.
//
// Esto es más que nada para conocer que Node proporciona su paquete para crear un webserver.
//
// PROBLEMA: Para hacer cualquier cosa, el paquete http requiere mucho trabajo. Para esto se inventó Express.
import http from 'http';

http
  .createServer((req, res) => {
    // console.log(req);

    // Cambiar el status de la response y el tipo de información devuelta.
    // Puede ser text/plain, application/json, application.csv...
    //
    // NOTA: Si es application/csv el navegador sabe que es un fichero que se tiene que descargar.
    // Por si solo funciona, pero no reconoce la extensión. Para ayudar con este se añade esta línea
    // de setHeader. Al añadir esto en los header le estamos diciendo al navegador es que hay un archivo
    // que se tiene que descargar y el nombre es lista.csv
    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    res.writeHead(200, { 'Content-Type': 'application/csv' });

    // Lo que escribimos en .write siempre tiene que ser un string, no vale objetos.
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // const persona = {
    //   id: 1,
    //   nombre: 'José Manuel',
    // };
    // res.write(JSON.stringify(persona));

    res.write('id, nombre\n');
    res.write('1, José Manuel\n');
    res.write('2, Adriana\n');
    res.write('3, Pepe\n');
    res.write('3, Marina\n');

    // Tenemos que decirle a Node que ya hemos terminado de escribr nuestra respuesta.
    res.end();
  })
  // Puerto donde se levanta la aplicación
  .listen(8080, () => {
    console.log('Escuchando el puerto', 8080);
  });
