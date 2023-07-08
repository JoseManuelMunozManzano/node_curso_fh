// Aquí es donde disparamos la conexión con nuestro backend server.

const url = 'http://localhost:8080/api/auth';

let usuario = null;
let socket = null;

// Validar el token del LocalStorage
const validarJWT = async () => {
  const token = localStorage.getItem('token') || '';

  if (token.length <= 10) {
    window.location = 'index.html';
    throw new Error('No hay token en el servidor');
  }

  // Añadiendo al header el parámetro x-token, que contiene nuestro token.
  const resp = await fetch(url, {
    headers: { 'x-token': token },
  });

  const { usuario: userDB, token: tokenDB } = await resp.json();

  // Renovando el token y obteniendo el usuario.
  localStorage.setItem('token', tokenDB);
  usuario = userDB;
};

const main = async () => {
  // Lo primero es validar que el JWT sea correcto.
  await validarJWT();
};

main();

// const socket = io();
