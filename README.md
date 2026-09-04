# Documentación del proyecto
## ¿Qué es?
Esta es una aplicación web de una sola página o single page titulada TaskFlow App que fue desarrollada utilizando React con Typescript y Material UI. Su propósito principal es ser una demostración del funcionamiento de las funciones CRUD a través de un frontend, y esto se logró haciéndola  una aplicación para administrar proyectos y las tareas dentro de ellos a través de una interfaz moderna que cumple una función similar más o menos a un tablero kanban. 

Cuenta con autenticación basada en tokens JWT y como se menccionó un CRUD completo para las entidades de proyectos y tareas.

## Tecnologías usadas
Para el desarrollo del frontend se utilizó React 18 con TypeScript y la herramienta para build Vite. Para la creación del UI y la definición de estilos se utilizó Material UI v5 y algunas que otras cosas relevantes como MUI Icons. Para el enrutamiento de la aplicaicón se usó el paquete npm React Router DOM v6. Para el consumo HTTP se utilizó el API fetcch y el cliente opensource Axios. También para  que los datos pudieran ser legibles desde cualquier parte del código se usó el Context API de React (lo que se le conoce como global state).

## Funcionalidades con las que cuenta
### Auth y seguridad
* La aplicación cuenta con manejo de sesión a través de tokens de autenticación JWT
* Un componente llamado ProtectedRoute que redirige  al login si no se está autenticado
* Cuando se cierra la sesión se limpia automáticamente el almacenamiento local y se redirige al login
### Manejo de datos en el módulo de proyectos
* FUnción POST se ve en el registro de nuevos proyectos (en el cual también se validan los campos que son obligatorios)
* GET en el listado de los proyectos en el cual se muestra también visualmente cuál proyecto está seleccionado interactivamente
* PUT/PATCH en e l modal de edición para que el usuario modifique nombres y/o descripciones de proyectos
* DELETE en la habilidad que se le otorga al usuario de borrar los proyectos con el ícono de bote de basura
### Manejo de datos en el módulo de tareas
* POST en el asignación de tareas a proyectos donde se les dan nombre, descripción, prioridad y fecha límite.
* GET en la habilidad de consultar las tareas y filtrarlas por estado de progreso  o por proyecto seleccionado.
* PUT/PATCH en el dropdown de cada tarjeta de tarea para cambiar su estado p. ej. de una tarea en progreso a completada
* DELETE similarmente en la habilidad de borrar las tareas y que se vea la actualización inmediatamente

## Cómo instalar y correr localmente
### Qué necesito?
* Se necesita Node.js ya sea v18.0.0 o superior
* y tener o npm o yarn (se recomienda npm es más fácil)
### Pasos
1. Clonar el repo e instalar las dependencias con `npm install`
2. Iniciar el servidor de desarrollo dentro de la carpeta root con `npm run dev`
3. Si se quiere hacer compilación de producción se hace `npm run build`

Es mi entendimiento (quizás esté equivocado) que el proyecto corre en localhost con el puerto por defecto que asigna npm que si no mal recuerdo es 5371 o uno similar. Si se desea usar otro puerto se puede agregar una variable de entorno en el archivo vite.config.ts o si no desea tanto rollo puede simplemente usar el comando con los parámetros así: `npm run dev -- --port 8000` donde 8000 es el puerto que quiera.

Es todo. No es perfecto pero cumple con todos los requerimientos y quizás lo actualice después para hacerlo más bonito o darle alguna que otra funcionalidad chida si se me ocurre.
