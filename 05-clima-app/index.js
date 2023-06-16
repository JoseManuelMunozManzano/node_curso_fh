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
        const lugares = await busquedas.buscarCiudades(terminoBusqueda);

        // Seleccionar el lugar
        const idSeleccionado = await listarLugares(lugares);
        if (idSeleccionado === '0') continue;

        const lugarSeleccionado = lugares.find((l) => l.id === idSeleccionado);

        // Guardar en DB
        busquedas.agregarHistorial(lugarSeleccionado.nombre);

        // Clima
        const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

        // Mostrar resultados
        console.clear();
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:', lugarSeleccionado.nombre.green);
        console.log('Lat:', lugarSeleccionado.lat);
        console.log('Lng:', lugarSeleccionado.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Mínima:', clima.min);
        console.log('Máxima:', clima.max);
        console.log('Tiempo:', clima.desc.green);
        break;

      case 2:
        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });

        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
