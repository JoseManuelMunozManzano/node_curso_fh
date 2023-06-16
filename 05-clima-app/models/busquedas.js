import axios from 'axios';

export default class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José', 'Bogotá'];

  constructor() {
    // TODO: leer DB si existe
  }

  async ciudad(lugar = '') {
    // Las peticiones http siempre es bueno ponerlas en un try catch
    try {
      // petición http
      const resp = await axios.get('https://reqres.in/api/users?page=2');
      console.log(resp.data);

      // retornar los lugares
      return [];
    } catch (error) {
      return [];
    }
  }
}
