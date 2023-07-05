# Node de cero a experto

Del curso Udemy https://www.udemy.com/course/node-de-cero-a-experto/

### 01-hola-mundo

app.js - Un rápido hola mundo para empezar a ver Node.
app2.js - Ciclo de Eventos de Node. Registrado de la función y ejecución.
app3.js - Ciclo de Eventos de Node. Orden de ejecución.

Ejecutar con los mandatos:

```
node app

node app2

node app3
```

### 02-fundamentos_js

En este punto vamos a ver un reforzamiento de ES6 y ES7.

- let vs var
- Template literales
- Destructuración
- Funciones de flecha
- Callbacks y callbacks en cadena
- Promesas y promesas en cadena
- Async y Await

### 03-bases-node

En este punto se van a ver las puras bases de Node.

- Requerir información de otros archivos
- Requerir paquetes --> en package.json se indica "type":"module" para hacer importaciones tipo JS
- Importar archivos personalizados
- NPM
  - Install
  - Uninstall
- Package.json
- Yargs
- Recibir parámetros por línea de comando
- Colores para la consola

### 04-lista-tareas

Es una aplicación de consola de tareas por hacer muy completa.

- stdin
- stdout
- Ciclos
- Inquirer
- Clases en JavaScript
- Archivos JSON
- Fuertemente async y await
- Transformaciones

### 05-clima-app

Es una aplicación de consola donde se puede buscar una ciudad y ver su clima. Se usa la API de Mapbox y OpenWeather.

- Consumo de APIs
- Llamadas HTTP hacia servidores externos
- Paquete request - superficialmente
- Paquete Axios
- Mapbox places para obtener lugares por nombre
- Uso de OpenWeather para obtener el clima
- Aplicación de consola con historial
- Variables de entorno

### 06-webserver

Webserver destinado a mostrar sitios webs estáticos/dinámicos y donde se desplegarán aplicaciones de producción de Angular y React.

- Uso y configuración de Express
- Servir contenido estático
- Servir contenido dinámico
- Template engines
- Handlebars
  - Parciales
  - Variables
- Despliegues en Heroku
- Hacer carpetas públicas en la web
- Desplegar aplicaciones de Angular y React

### 07-webserver2

Es un ejercicio de la parte 06-webserver que, para aislarlo y no mezclarlo con las notas de Express, se crea aparte.
Consiste en servir un template en el servidor de Express.

### 08-webserver-hbs

Es un ejercicio de la parte 06-webserver que, para aislarlo y no mezclarlo con las notas de Express, se crea aparte.

Consiste en usar el template engine Handlebars para pre-renderizar las vistas en el backend y que Express las mande como respuesta a los respectivos endpoints.

### 09-restserver

Es una práctica Rest en NodeJS usando Express basado en clases.

Se van a cubrir los siguientes temas:

- Instalación y pruebas con MongoDB
- Peticiones HTTP
  - Get
  - Put
  - Post
  - Delete
- Aprender sobre códigos de error HTTP
- Códigos de error en Express
- Archivos para la configuración global
- Tips importantes en Postman
- Definir los alcances de nuestro RESTServer
- CRUD
- Encriptación de contraseñas
- Validaciones personalizadas
- Creación de roles
- Conexiones con MLAB
- Despliegue de base de datos en la nube
- Conexión con Robo 3T con base de datos en la nube
- Configuración de variables de entorno
- Borrado de archivos
  - Eliminado físico de la base de datos
  - Eliminación por estado en un campo de la colección
- Introducción a los tokens
- JWT
- Login personalizado
- Protección de rutas vía token
- Leer payload del token sin la firma
- Tips importantes para POSTMan
- Despliegues en Heroku para pruebas en producción
- Uso de Middleware
- Generar API Key de Google
- Generar API Secret
- Usar librerías de Google para la validación de tokens
- Tips importantes en PostMan
- Uso del Google SignIn en el Front-End
- Crear usuarios personalizados en base a respuestas de Google
- CRUD de categorías y productos
- Relaciones
- Populate
- Búsquedas
- Carga de archivos
- Validaciones de archivos
- Re-ubicar archivos
- Actualizar fotografía de un usuario
- Borrar archivos
- Cargar imágenes a los productos
- Servicio para mostrar y proteger imágenes
- Uso de dichas imágenes en el front-end
- Cloudinary
- Cloudinary SDK

### 10-restserver_respaldo

Rest configurado con Express con clases.

Es un backed básico listo para ir metiéndole funcionalidad.

### 11-websocket-server

Comenzamos un proyecto para ver como funcionan los sockets.

Se van a cubrir los siguientes temas:

- Introducción a los sockets
- Resolver preguntas comunes sobre los sockets
- Instalación de Socket.io
- Detectar conexiones y desconexiones de usuarios
- Emitir mensajes cliente servidor / servidor cliente
- Escuchar los mensajes servidor cliente / cliente servidor
- Broadcast
- Callbacks en los sockets
