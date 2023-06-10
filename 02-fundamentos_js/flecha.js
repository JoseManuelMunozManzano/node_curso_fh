(() => {
  console.log('\nFLECHA');

  // Función tradicional con uno de los argumentos con un valor por defecto.
  // Se siguen usando pero para cosas muy específicas.
  function sumarTrad(a, b = 10) {
    return a + b;
  }

  console.log(sumarTrad(5, 10));
  console.log(sumarTrad(3));

  console.log();

  // Las funciones de flecha tienen muchas características y ventajas sobre las funciones tradicionales.
  // La principal diferencia con las funciones tradicionales es que las tradicionales manipulan
  // el valor a lo que apunta el this y las funciones de flecha no.
  const sumar = (a, b = 10) => {
    return a + b;
  };

  console.log(sumar(5, 10));
  console.log(sumar(3));

  console.log();

  // Si la función flecha consta de una sola línea, que además es el return, como es el caso de arriba,
  // se puede resumir el código (return implícito) a:
  const sumarRes = (a, b = 10) => a + b;
  console.log(sumarRes(5, 10));
  console.log(sumarRes(3));
})();
