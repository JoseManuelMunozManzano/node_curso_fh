// Simple resumen de const vs let vs var

// ----------------------------- var -----------------------------
// De las versiones antiguas de JS. No se recomienda su uso porque da lugar a errores y usos extraños.
// Se crea la variable en un ámbito global.
var nombre = 'Wolverine';

if (true) {
  // Esta variable debería ser local a este if
  // PERO como nombre se creó con var, la variable nombre es de AMBITO GLOBAL y SALE DEL if.
  var nombre = 'Magneto';
}

// Aquí nombre tiene el valor Magneto.
console.log('Nombre:', nombre);

// ----------------------------- let -----------------------------
// Usar let cuando estamos seguros de que nuestras variables van a cambiar sus valores.
// Variable declarada a nivel global.
let nombre2 = 'Wolverine';

if (true) {
  // Esta variable es declarada a nivel local en este if y NO SALE del if.
  // Es otro scope distinto.
  let nombre2 = 'Magneto';

  // NOTA: Si en vez de declarar la variable de nuevo se quisiera ejecutar:
  // nombre2 = 'Magneto';
  // entonces, como no hay declaración, se busca la declaración en un scope superior
  // y SI cambia el valor de Wolverine a Magneto.
}

// Aquí nombre tiene el valor Wolverine.
console.log('Nombre2:', nombre2);

// ----------------------------- const -----------------------------
// Dentro de lo posible, es mejor declarar todo como constantes, es más rápido y menos proclive a errores.
// Constante declarada a nivel global.
const nombre3 = 'Wolverine';

if (true) {
  // Esta constante es declarada a nivel local en este if y NO SALE del if.
  // Es otro scope distinto.
  const nombre3 = 'Magneto';

  // NOTA: Esto no es posible, da error, porque nombre3 es una CONSTANTE
  // nombre3 = 'Magneto';
}

// Aquí nombre tiene el valor Wolverine.
console.log('Nombre3:', nombre3);
