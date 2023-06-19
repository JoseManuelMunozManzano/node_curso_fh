import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log('Servidor corriendo en puerto', port);
});
