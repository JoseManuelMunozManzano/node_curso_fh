// Configuración de la BD
//
// Vamos a usar sequelize como ORM para trabajar con MySql. También puede trabajar con Postgres,
// MariaDB, SQLite y Microsoft SQL Server. Sería como mongoose, pero para BD relacionales.
// https://sequelize.org/
// Instalación
// npm install sequelize mysql2
import { Sequelize } from 'sequelize';

const database = process.env.DB_DATABASE || '';
const usuario = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '';
const port: number = Number(process.env.DB_PORT) || 3306;

const db = new Sequelize(database, usuario, password, {
  host,
  dialect: 'mysql',
  // Se puede indicar el puerto. Por defecto es el 3306.
  port,
  // El logging, para fines educativos es importante dejarlo a true.
  // Cada comando que ejecutemos e impacte en la BD lo veremos en consola.
  // Para producción descomentar esta línea.
  //logging: false

  // Para que no cree los campos createdAt y updatedAt
  // Si no se indica esto, hay que crear los campos en la BD.
  // define: {
  //   timestamps: false,
  // },
});

export default db;
