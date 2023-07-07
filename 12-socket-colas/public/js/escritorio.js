// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');

// Para saber si el escritorio ya existe en el url.
// Ejemplo: http://localhost:8080/escritorio.html?escritorio=Escritorio+1
// Aquí si existe como param el parámetro escritorio
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
  btnAtender.disabled = false;
});

socket.on('disconnect', () => {
  btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
  // lblNuevoTicket.innerText = 'Ticket ' + ultimo;
});

btnAtender.addEventListener('click', () => {
  // Esto también se podría hacer con una petición REST.
  socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = 'Nadie';
      return (divAlerta.style.display = '');
    }

    lblTicket.innerText = 'Ticket ' + ticket.numero;
  });
});
