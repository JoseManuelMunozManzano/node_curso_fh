// Mongoose
// npm i mongoose
// https://mongoosejs.com/docs/index.html
import mongoose from 'mongoose';

export const dbConnection = async () => {
  // Como es una conexión a una BD en la que yo no tengo el control absoluto, es bueno
  // incluirlo en un try/catch
  try {
    // Recordar que dotenv ya se ha cargado de forma global en la aplicación en index.js
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('Base de datos online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos');
  }
};
