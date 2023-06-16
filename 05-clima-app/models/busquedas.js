import fs from 'fs';
import axios from 'axios';

export default class Busquedas {
  historial = [];
  // Es muy fácil trabajar con JSON en JavaScript porque se puede serializar y deserializar muy fácilmente.
  dbPath = './db/database.json';

  constructor() {
    this.leerDB();
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(' ');
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(' ');
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
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

  async climaLugar(lat, lon) {
    try {
      // Petición http
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = '') {
    if (this.historial.includes(lugar.toLowerCase())) {
      return;
    }

    // 6 ciudades en mi historial
    this.historial = this.historial.splice(0, 5);

    this.historial.unshift(lugar.toLowerCase());

    // Grabar en DB
    this.guardarDB();
  }

  guardarDB() {
    // Lo indicamos así porque podríamos tener más propiedades que grabar. Esto da mucha flexibilidad.
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    this.historial = data.historial;

    return this.historial;
  }
}
