// Movemos toda la lógica a otros fuentes y exportamos lo necesario.

// IMPORTANTE: Para poder usar las importaciones de JS hay que indicar en package.json
//   "type": "module"
import fs from 'fs';
import colors from 'colors';

export const crearArchivo = async (base = 5, listar = false) => {
  try {
    const file = `tabla-${base}.txt`;
    let salida = '';

    for (let i = 1; i < 11; i++) {
      salida += `${base} ${'x'.green} ${i} ${'='.green} ${base * i}\n`;
    }

    if (listar) {
      console.log('================='.green);
      console.log('   TABLA DEL'.green, colors.blue(base));
      console.log('================='.green);
      console.log(salida);
    }

    fs.writeFileSync(`${file}`, salida);

    return file;
  } catch (err) {
    throw err;
  }
};
