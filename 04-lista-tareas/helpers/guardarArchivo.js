import fs from 'fs';

const archivo = './db/data.json';

export const guardarDB = (data) => {
  // Se indica JSON.stringify porque un array no puede grabarse directamente a fichero.
  // Debe ser un buffer o un string..., pero no array.
  // Se crea un JSON.
  fs.writeFileSync(archivo, JSON.stringify(data));
};

export const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  // Por defecto regresa bytes, así que se indica el encoding.
  const info = fs.readFileSync(archivo, { encoding: 'utf-8' });

  // Deserializamos o parseamos, es decir, lo contrario al strinfigy para obtener nuestro
  // arreglo de objetos.
  const data = JSON.parse(info);

  // console.log(data);

  // Devuelvo arreglo de tareas.
  return data;
};
