# Comenzando con Create React App

Este proyecto se inicializó con [Create React App](https://github.com/facebook/create-react-app).

## Instrucciones para Lerna

Este proyecto utiliza Lerna para gestionar múltiples paquetes. Sigue estos pasos para ejecutar la aplicación:

1. Clona el repositorio:

   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Ingresa al directorio del repositorio:

   ```
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

3. Instala las dependencias:

   ```
   npm install
   ```

4. Compila los paquetes con Lerna:

   ```
   lerna run build
   ```

5. Inicia la aplicación localmente:

   ```
   lerna run start:prod
   ```

Esto ejecutará la aplicación y podrás verla localmente. Abre http://localhost:3000 en tu navegador para acceder a la aplicación.
