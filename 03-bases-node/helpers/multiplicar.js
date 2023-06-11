// Movemos toda la lógica a otros fuentes y exportamos lo necesario.

// IMPORTANTE: Para poder usar las importaciones de JS hay que indicar en package.json
//   "type": "module"
import fs from 'fs';
import colors from 'colors';

import './raw.js';

export const crearArchivo = async (base = 5, hasta = 10, listar = false) => {
  try {
    const file = `tabla-${base}.txt`;
    let salida = '';

    for (let i = 1; i <= hasta; i++) {
      salida += `${base} ${'x'.green} ${i} ${'='.green} ${base * i}\n`;
    }

    if (listar) {
      console.log('================='.green);
      console.log('   TABLA DEL'.green, colors.blue(base));
      console.log('================='.green);
      console.log(salida);
    }

    fs.writeFileSync(`./salida/${file}`, salida.raw);

    return file;
  } catch (err) {
    throw err;
  }
};
