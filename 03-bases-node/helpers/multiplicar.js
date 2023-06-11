// Movemos toda la lógica a otros fuentes y exportamos lo necesario.

// IMPORTANTE: Para poder usar las importaciones de JS hay que indicar en package.json
//   "type": "module"
import fs from 'fs';

export const crearArchivo = async (base = 5) => {
  console.log('=================');
  console.log('   TABLA DEL', base);
  console.log('=================');

  try {
    const file = `tabla-${base}.txt`;
    let salida = '';

    for (let i = 1; i < 11; i++) {
      salida += `${base} x ${i} = ${base * i}\n`;
    }

    console.log(salida);

    fs.writeFileSync(`${file}`, salida);

    return file;
  } catch (err) {
    throw err;
  }
};
