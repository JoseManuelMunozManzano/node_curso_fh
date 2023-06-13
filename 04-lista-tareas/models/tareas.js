import Tarea from './tarea.js';
/**
 *  _listado:
 *      { 'uuid-12131233-12313123-2: {id: 12, desc:asd, completadoEn:23234} },
 */

export default class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
}
