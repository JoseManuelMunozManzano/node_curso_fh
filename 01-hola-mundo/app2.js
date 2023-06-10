// Ciclo de Eventos de Node

// Node registra esta función
const saludar = (nombre) => {
  return `Saludos ${nombre}`;
};

// Cuando llega aquí Node ya sabe que existe la referencia a saludar y lo ejecuta.
console.log(saludar('José Manuel'));
