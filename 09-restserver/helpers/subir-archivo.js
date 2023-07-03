// Se hará la validación, regresará el url y creará la ubicación final si no existiera.
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const extensionesValidasImg = ['png', 'jpg', 'jpeg', 'gif'];

// Aunque se puede enviar más de un archivo es normal dejar subir solo uno, porque en el front
// podría haber algún tipo de drag and drop.
export const subirArchivo = (files, extensionesValidas = extensionesValidasImg, carpeta = '') => {
  // Cuando necesitamos que algo salga bien o salga mal es bueno trabajar en base a promesas.
  // Si necesitáramos cancelar la promesa o estar escuchando algo constantemente es mejor usar expresiones
  // reactivas.
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    // Validando las extensiones de los archivos.
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    }

    // Renombramos la imagen al colocarla en la carpeta uploads. Con esto evitamos que haya problemas si
    // se suben dos archivos que se llaman igual. Se usa el uuid para que el nombre sea único.
    // Instalación:
    // npm i uuid
    const nombreTemp = uuidv4() + '.' + extension;

    // Dentro de la carpeta uploads puede que haya más carpetas donde grabar el archivo.
    // NOTA: Mandar todo el path no tiene sentido ya que ni pulsando en el enlace va a funcionar ver el archivo.
    //      Funcionaría si la carpeta fuera /public, pero con la carpeta /uploads no funciona.
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

    // Con la opción createParentPath, si al hacer el mv la carpeta no existe, la crea.
    // Cuidado porque un código malicioso podría crear carpetas.
    // Añadido en server.js, en el middleware de fileUpload.
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      // Mandamos solo el nombre del archivo por lo comentado del problema de mandar todo el path completo.
      resolve(nombreTemp);
    });
  });
};
