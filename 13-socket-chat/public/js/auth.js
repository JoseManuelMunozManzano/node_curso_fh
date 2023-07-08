const url = 'http://localhost:8080/api/auth';

const miFormulario = document.querySelector('form');

miFormulario.addEventListener('submit', (ev) => {
  ev.preventDefault();

  // Esta es la data que voy a mandar al servidor.
  const formData = {};

  for (let el of miFormulario.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      // Si hay msg es porque hay un error
      if (msg) {
        return console.error(msg);
      }

      localStorage.setItem('token', token);
      window.location = 'chat.html';
    })
    .catch(console.warn);
});

// Cogido de: https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions?hl=es-419
// Pero se ha cambiado por completo
// Mantener como función tradicional porque no funciona con función de flecha.
function handleCredentialResponse(response) {
  // Google Token: ID_TOKEN
  //console.log('id_token', response.credential);
  const body = { id_token: response.credential };

  // La promesa, al utilizar el Fetch API no devuelve el body directamente, lo regresa como un readable stream.
  // Hay que serializarlo.
  // Para que funcione, importante indicar que la petición es POST (por defecto es GET) y los headers.
  // Y también hay que mandar el body (es un POST!) y tiene que estar serializado.
  fetch(`${url}/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      // console.log(resp);
      // console.log(resp.token);

      // Grabamos el correo para poder usarlo luego en el Google Signout de abajo
      localStorage.setItem('email', resp.usuario.correo);
      // También grabamos el token, que me servirá para validar mi token en la parte de los sockets.
      localStorage.setItem('token', resp.token);
      window.location = 'chat.html';
    })
    .catch(console.warn);
}

// Google Signout
// Necesitamos el correo de la persona que se autenticó.
const button = document.getElementById('google_signout');
button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();

  // Se revoca el acceso y se recarga la página para limpiar cualquier cosa que esté en el estado
  // de nuestra aplicación.
  google.accounts.id.revoke(localStorage.getItem('email'), (done) => {
    localStorage.clear();
    location.reload();
  });
};
