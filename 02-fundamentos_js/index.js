require('./const-var-let');
require('./template-string');
require('./desestructuracion');
require('./flecha');
const { callback } = require('./callbacks');
const { callback_error } = require('./callback-error');
const { callback_hell } = require('./callback-hell');

callback()
  .then(() => callback_error())
  .then(() => callback_hell());
