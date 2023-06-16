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

  async buscarCiudades(lugar = '') {
    // Las peticiones http siempre es bueno ponerlas en un try catch
    try {
      // Petición http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      // retornar los lugares
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }
}
