![Logo hackathones](/back/public/media/hackaton-banner.jpg)

# ¿De qué va esto?

Este portal de Hackathones es un proyecto de fin de bootcamp impartido en [Hack a Boss](https://www.hackaboss.com/).

Consiste en una aplicación web que permite, si eres administrador, publicar y puntuar eventos, y, si eres usuario, apuntarte a ellos como competidor.

## Índice / FAQ

-   [Antes de empezar...](#recomendaciones)
-   [¿Qué diseño utilizará la aplicación?](#diseño)
-   [¿Que tengo que configurar para probar la app?](#configuración-previa)
-   [¿Puedo hacer pruebas del backend?](#testing)
-   [¿Qué tecnologías se usan en la app?](#tecnologías)

### Recomendaciones

---

Para poder hacer un uso correcto de los test, sería conveniente tener instalado [Postman](https://www.postman.com/), además de Node y MySQL.

### Diseño

La aplicación actualmente está en construcción, aunque ya tenemos una primera idea en forma visual, [¡NO TE LO PIERDAS!](/docs/wireframe/wireframeHackathon.pdf)

### Configuración previa

---

**_Instalación de dependecias_**

Una vez descargado el repositorio, abre tu terminal dentro de la carpeta `/back` y usa `npm i` dentro de la carpeta.

**_Configura las variables de entorno_**

Edita el archivo `.envexample` y haz las configuraciones necesarias. Es importante que todas las variables tengan un sentido en el servidor de instalación.

Una vez termines, cambia el nombre del archivo a `.env`

**_Crea y pobla la base de datos_**

Si quieres hacer usar de la base de datos establecida (y recomendada para este proyecto), usa los siguientes comandos en tu terminal respetando el orden:

1. `npm run initDb_schema`
2. `npm run initDb_data`

**_Inicia el servidor_**

Haz uso del comando `npm run dev` en tu terminal.

### Testing

---

Para facilitar el test de cada uno de los endpoints, puedes descargar las colecciones de Postman, ubicadas en `docs/postman`.

Simplemente importa las colecciones, y ejecútalas.

**_Nota:_** En las variables de entorno en Postman, `URL_BASE` está configurada como `http://localhost` y las peticiones se hacen sobre el puerto `:3001`. Si quieres probarlo bajo otra configuración, asegúrate de cambiar estos puntos.

### Tecnologías

---

**_Backend:_**

-   NodeJS
-   Express

**_Frontend:_**

-   React + Vite
