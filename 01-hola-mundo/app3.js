// Ciclo de eventos de Node
// Orden de ejecución.

// Todas estas instrucciones son NO BLOQUEANTES, de ahí el orden indicado.

// 1
console.log('Inicio de programa');

// 5
setTimeout(() => {
  console.log('Primer Timeout');
}, 3000);

// 3 - No tiene orden 2, siendo tiempo 0, porque el callback del setTimeout va a una pila (stack) de
//     ejecución
setTimeout(() => {
  console.log('Segundo Timeout');
}, 0);

// 4
setTimeout(() => {
  console.log('Tercer Timeout');
}, 0);

// 2
console.log('Fin de programa');
