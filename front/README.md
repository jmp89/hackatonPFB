![Logo HackAVerse](../back/public/media/logo_hackaverse.svg)

# INSTRUCCIONES DEL FRONTEND

## Índice / FAQ

-   [Antes de empezar...](#configuración-previa)
-   [¿Puedo ver como es el diseño antes de la descarga?](#diseño)
-   [¿Cómo inicio la aplicación?](#arrancando-la-parte-visual)
-   [¿Qué ventajas tiene este frontend?](#funcionalidades)
-   [¿Qué rutas tiene la app?](#rutas)

### Configuración previa

Es imprescindible para poder hacer un uso funcional del frontend, [tengamos todo a punto en el backend](../back/README.md#instrucciones-del-backend)

### Diseño

La aplicación actualmente está en desarrollo, aunque ya tenemos una idea en forma visual, [¡NO TE LO PIERDAS!](../docs/wireframe/)

### Arrancando la parte visual

Empezaremos de la siguiente forma:

1. Extrae las carpetas del archivo [`PFB-svgs.zip`](../docs/general/PFB-svgs.zip) ubicado en [`docs/general`](../docs/general/) dentro de la carpeta `back/public`
    - Nota: En las imágenes de `uploads`, si cambias una por otra personalizada, se borra la anterior. Si reinicias la base de datos tienes que volver a insertar las imágenes que se han borrado
1. Configura la ruta del backend tu app en el archivo `.env`
1. Inicia tu terminal en el directorio `/front`.
1. Instala las dependencias con `npm i`
1. Arranca el servidor del front con `npm run dev`

### Funcionalidades

-   Fácil mantenimiento y escabilidad al estar hecho con componentes de React
-   Estilos fáciles de mantener con Tailwind
-   Diseño responsivo, hecho con metodología mobile-first
-   Renderizados condicionales, en función de si entras como usuario registrado o no

### Rutas

-   **`/`**

    Esta es la página de inicio, aquí se muestra una lista de eventos recomendados

-   **`/register`**

    Aquí hay un formulario para registrarte como usuario a la plataforma

-   **`/users/validate/activate`**

    Ruta donde activas tu cuenta recién registrada

-   **`/users/login`**

    Identíficate como usuario registrado

-   **`/reset-password`**

    Recupera tu contraseña usando tu e-mail

-   **`/users/profile`**

    Tu perfil de usuario

-   **`/event/create`**

    Crea un evento nuevo (solo admin)

-   **`/event/edit/:eventID`**

    Edita un evento creado (solo admin)

-   **`/event/validate/activate`**

    Valida tu inscripción al evento con un código único

-   **`/event/search`**

    Listado de eventos disponibles con un buscador

-   **`/event/details/:eventId`**

    Página de cada evento con toda la información

-   **`/event/results`**

    Listado de eventos finalizados con los resultados

-   **`/event/insert-results/:eventID`**

    (Solo admin) Desde los detalles del evento finalizado, inserta resultado de los participantes

-   **`/faq`**

    Preguntas frecuentes

-   **`/not-found`**

    Cualquier ruta que no coincida, muestra una página de error
