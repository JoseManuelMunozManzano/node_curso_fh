(() => {
  console.log('DESESTRUCTURACION');

  const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    //edad: 50,

    getNombre() {
      return `${this.nombre} ${this.apellido} ${this.poder}`;
    },
  };

  // Sin desestructuración.
  //
  // const nombre = deadpool.nombre;
  // const apellido = deadpool.apellido;
  // const poder = deadpool.poder;
  // console.log(nombre, apellido, poder);

  // Con la desestructuración evitamos escribir todo el código de arriba al extraer propiedades de un objeto.
  // Es también más fácil de leer.
  // Se pueden indicar valores por defecto si edad no existe en el objeto.
  const { nombre, apellido, poder, edad = 0 } = deadpool;
  console.log(nombre, apellido, poder, edad);

  // Se puede realizar la desestructuración de un objeto (y de un array) en el argumento de una función.
  // Pero indicar que serían variables cuyos valores pueden cambiar, a diferencia de declarar un const.
  function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
    console.log(nombre, apellido, poder, edad);
  }

  imprimeHeroe(deadpool);

  // También se pueden desestructuras arrays
  const heroes = ['Deadpool', 'Superman', 'Batman'];

  // Sin desestructuración
  // const h1 = heroes[0];
  // const h2 = heroes[1];
  // const h3 = heroes[2];

  // Con desestructuración
  const [h1, h2, h3] = heroes;
  console.log(h1, h2, h3);

  // Si solo queremos uno de los elementos del array, pero otros no
  const [, , h4] = heroes;
  console.log(h4);
})();
