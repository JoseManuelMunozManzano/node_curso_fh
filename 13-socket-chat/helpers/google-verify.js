// Verificación ID Token
// https://developers.google.com/identity/gsi/web/guides/verify-google-id-token?hl=es-419
// Instalación necesaria:
// npm install google-auth-library --save
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleVerify = async function verify(token = '') {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { name, picture, email } = ticket.getPayload();

  // Lo renombro porque estamos trabajando con variables en español.
  return {
    nombre: name,
    img: picture,
    correo: email,
  };
};
