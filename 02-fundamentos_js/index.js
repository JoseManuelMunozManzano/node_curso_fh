require('./const-var-let');
require('./template-string');
require('./desestructuracion');
require('./flecha');
const { callback } = require('./callbacks');
const { callback_error } = require('./callback-error');

callback().then(() => callback_error());
