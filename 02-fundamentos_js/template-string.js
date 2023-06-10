(() => {
  console.log('\nTEMPLATE STRINGS');

  const nombre = 'Deadpool';
  const real = 'Wade Winston';

  const normal = nombre + ' - ' + real;

  // Los template strings otorgan una gran flexibilidad.
  // `` son backticks
  // Si se indica ${} lo que vaya entre paréntesis será una expresión válida de JS.
  const templateString = `${nombre} - ${real}`;

  console.log(normal);
  console.log(templateString);

  // Los template strings permiten multilínea.
  // NOTA: Tras el primer backstick hay un salto de línea, y antes del último backstick hay otro salto de línea.
  const html = `
<h1>Hola</h1>
<p>Mundo</p>
`;

  console.log(html);
})();
