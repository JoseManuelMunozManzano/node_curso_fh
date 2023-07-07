# 12-socket-colas

Vamos a crear una aplicación de colas.

Se van a cubrir los siguientes temas:

- Aplicar sockets en un proyecto real
- Aprender sobre clases del ES6
- Asignar Tickets
- Leer Tickets
- Notificaciones

1. Para instalar las dependencias:

```
npm i
```

2. Para ejecutar:

```
npm run start:dev
```

3. Ir a la ruta

```
http:/localhost:8080
```

IMPORTANTE:
Archivo de configuración nodemon.json
Me hace falta porque cuando pulso algún botón, Nodemon detecta que hay un cambio en un archivo y se reinicia.
Esto hace que se desconecte y se vuelva a conectar el servidor.
En Producción no se usa Nodemon y ahí no va a pasar, pero tampoco queremos que pase en Desarrollo.
Indicamos en nodemon.json lo que queremos que ignore, es decir, si cambia ese archivo Nodemon no se va a reiniciar.
