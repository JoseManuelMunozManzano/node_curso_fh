require('./const-var-let');
require('./template-string');
require('./desestructuracion');
require('./flecha');
const { callback } = require('./callbacks');
const { callback_error } = require('./callback-error');
const { callback_hell } = require('./callback-hell');
const { promesas } = require('./promesas');
const { promesas_cadena } = require('./promesas-cadena');
const { async_await } = require('./async-await');

callback()
  .then(() => callback_error())
  .then(() => callback_hell())
  .then(() => promesas())
  .then(() => promesas_cadena())
  .then(() => async_await());
