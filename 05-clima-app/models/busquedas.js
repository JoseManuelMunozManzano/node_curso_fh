import axios from 'axios';

export default class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José', 'Bogotá'];

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  async ciudad(lugar = '') {
    // Las peticiones http siempre es bueno ponerlas en un try catch
    try {
      // Petición http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      console.log(resp.data);

      // retornar los lugares
      return [];
    } catch (error) {
      return [];
    }
  }
}
