import { v4 as uuidv4 } from 'uuid';

export default class Tarea {
  // Esto no haría falta, pero así es fåcil de ver que propiedades tiene nuestra clase.
  id = '';
  desc = '';
  completadoEn = null;

  constructor(desc) {
    // this hace referencia a la instancia de la clase que se esté usando.
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
  }
}
