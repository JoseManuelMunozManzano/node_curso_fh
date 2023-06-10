// IMPORTANTE: Para poder usar las importaciones de JS hay que indicar en package.json
//   "type": "module"
import fs from 'fs';

//? Se va a imprimir la tabla de multiplicar y grabarla en un archivo de texto que esté en la
//? misma dirección de mi aplicación.
//? Primero lo vamos a hacer con fs.writeFile y luego con fs.writeFileSync

// Utilidades de Node listas para usar sin tener que instalar nada:
// https://nodejs.org/dist/latest-v18.x/docs/api/

// Para limpiar la consola automáticamente antes de mostrar el resultado.
console.clear();

const base = 5;
const file = `tabla-${base}.txt`;
let salida = '';

console.log('=================');
console.log(`   TABLA DEL ${base}   `);
console.log('=================');

for (let i = 1; i < 11; i++) {
  salida += `${base} x ${i} = ${base * i}\n`;
}

console.log(salida);

// Uso de fs.writeFile
// https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fswritefilefile-data-options-callback
fs.writeFile(`${file}`, salida, (err) => {
  if (err) throw err;

  console.log(`${file} creado`);
});
