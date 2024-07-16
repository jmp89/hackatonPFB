![Logo hackathones](./public/logo_hackaverse.svg)

# INSTRUCCIONES DEL FRONTEND

## Índice / FAQ

-   [Antes de empezar...](#configuración-previa)
-   [¿Puedo ver como es el diseño antes de la descarga?](#diseño)
-   [¿Cómo inicio la aplicación?](#arrancando-la-parte-visual)
-   [¿Qué ventajas tiene este frontend?](#funcionalidades)

### Configuración previa

Es imprescindible para poder hacer un uso funcional del frontend, [tengamos todo a punto en el backend](../back/README.md#instrucciones-del-backend)

### Diseño

La aplicación actualmente está en desarrollo, aunque ya tenemos una idea en forma visual, [¡NO TE LO PIERDAS!](../docs/wireframe/)

### Arrancando la parte visual

Empezaremos de la siguiente forma:

1. Configura la ruta del backend tu app en el archivo `.env`
2. Inicia tu terminal en el directorio `/front`.
3. Instala las dependencias con `npm i`
4. Arranca el servidor del front con `npm run dev`

### Funcionalidades

-   Fácil mantenimiento y escabilidad al estar hecho con componentes de React
-   Estilos fáciles de mantener con Tailwind
-   Diseño responsivo, hecho con metodología mobile-first
-   Renderizados condicionales, en función de si entras como usuario registrado o no
