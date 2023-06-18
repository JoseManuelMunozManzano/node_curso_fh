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
