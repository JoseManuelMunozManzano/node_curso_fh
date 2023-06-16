// Node ya incluye por defecto las variables de entorno creadas en .env
// Para ver las variables de entorno:
// console.log(process.env);
import 'dotenv/config';

import { inquirerMenu, leerInput, listarLugares, pausa } from './helpers/inquirer.js';
import Busquedas from './models/busquedas.js';

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const terminoBusqueda = await leerInput('Ciudad: ');

        // Buscar los lugares
        const lugares = await busquedas.ciudad(terminoBusqueda);

        // Seleccionar el lugar
        const idSeleccionado = await listarLugares(lugares);
        const lugarSeleccionado = lugares.find((l) => l.id === idSeleccionado);

        // Clima

        // Mostrar resultados
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:', lugarSeleccionado.nombre);
        console.log('Lat:', lugarSeleccionado.lat);
        console.log('Lng:', lugarSeleccionado.lng);
        console.log('Temperatura:');
        console.log('Mínima:');
        console.log('Máxima:');
        break;

      case 2:
        console.log('Seleccionada opción 2');
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
