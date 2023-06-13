import fs from 'fs';

export const guardarDB = (data) => {
  const archivo = './db/data.json';

  // Se indica JSON.stringify porque un array no puede grabarse directamente a fichero.
  // Debe ser un buffer o un string..., pero no array.
  // Se crea un JSON.
  fs.writeFileSync(archivo, JSON.stringify(data));
};
