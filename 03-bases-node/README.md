# 03-bases-node

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

Para crear el proyecto:

```
npm init -y
```

Para instalar las dependencias:

```
npm i
```

Para ver la ayuda y saber como ejecutar:

```
npm run node -- --help
```

Para ejecutar (base puede ser cualquier número, listar puede o no estar y hasta es la cantidad de multiplicaciones):

```
npm start -- --base=5 --listar --hasta=12

o

npm run node -- --base=7 -l --hasta=15
```
