![Logo hackathones](../front/public/logo_hackaverse.svg)

# INSTRUCCIONES DEL BACKEND

## Índice / FAQ

-   [Antes de empezar...](#recomendaciones)
-   [¿Que tengo que configurar para probar el backend?](#configuración-previa)
-   [¿Puedo hacer pruebas del backend?](#testing)

### Recomendaciones

---

Para poder hacer un uso correcto de los test, sería conveniente tener instalado [Postman](https://www.postman.com/), además de Nodejs y MySQL.

### Configuración previa

---

**_Instalación de dependencias_**

Una vez descargado el repositorio, abre tu terminal dentro de la carpeta `/back` y usa `npm i`.

**_Configura las variables de entorno_**

Edita el archivo `.envexample` y haz las configuraciones necesarias. Es importante que todas las variables tengan un sentido en el servidor de instalación.

Una vez termines, cambia el nombre del archivo a `.env`

**_Crea y pobla la base de datos_**

La base de datos tendrá el nombre que indiques en el `.env`, (cuidado si ya tienes una BBDD con ese nombre en local!), usa los siguientes comandos en tu terminal respetando el orden:

1. `npm run initDb_schema`
2. `npm run initDb_data`

**_Inicia el servidor_**

Haz uso del comando `npm run dev` en tu terminal.

### Testing

---

Para facilitar el test de cada uno de los endpoints, puedes descargar las colecciones de Postman, ubicadas en `docs/postman`.

Simplemente importa las colecciones, y ejecútalas.

**_Nota:_** En las variables de entorno en Postman, `URL_BASE` está configurada como `http://localhost` y las peticiones se hacen sobre el puerto `:3001`. Si quieres probarlo bajo otra configuración, asegúrate de cambiar estos puntos. Deberás actualizar el `TOKEN_USER` y el `TOKEN_ADMIN` haciendo login con los datos correspondientes para poder validar en el Header `Authorization`.
