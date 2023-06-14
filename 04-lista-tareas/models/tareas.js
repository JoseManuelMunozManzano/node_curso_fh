import Tarea from './tarea.js';
import 'colors';
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

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[i];
    }
  }

  // Se inicializa más que nada para recibir la ayuda de VSCode sobre que métodos se pueden usar.
  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // 1: en verde
    // Completada: verde
    // Pendiente: rojo
    //
    // 1. Alma :: Completada | Pendiente
    // 2. Realidad :: Completada | Pendiente
    // 3. Poder :: Completada | Pendiente
    console.log();

    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

      console.log(`${idx} ${desc} :: ${estado} `);
    });
  }

  listarPendientesOCompletadas(completadas = true) {
    console.log();

    this.listadoArr
      .filter((tarea) => (tarea.completadoEn ? true : false) === completadas)
      .forEach((tarea, i) => {
        const idx = `${i + 1}`.green;
        const { desc, completadoEn } = tarea;
        const estado = completadoEn ? completadoEn.green : 'Pendiente'.red;

        console.log(`${idx} ${desc} :: ${estado} `);
      });
  }
}
