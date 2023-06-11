// Para eliminar los caracteres del paquete colors que añade al file creado.
// https://github.com/Marak/colors.js/issues/274
export const raw = Object.defineProperty(String.prototype, 'raw', {
  get: function () {
    return this.replace(/\x1b\[..?m/g, '');
  },
});
