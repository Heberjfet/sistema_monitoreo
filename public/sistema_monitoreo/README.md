# Sistema de Monitoreo para Centro de Datos

Este proyecto es un sistema de monitoreo diseñado para gestionar y registrar datos de un centro de datos. Permite el seguimiento de diferentes aspectos críticos, incluyendo luces, inrows, lámparas de emergencia y aires acondicionados.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
sistema_monitoreo
├── src
│   ├── database
│   │   ├── config.js              # Configuración de la base de datos
│   │   ├── connection.js          # Manejador de conexión a la base de datos
│   │   └── models
│   │       ├── Luces.js           # Modelo para la entidad "Luces"
│   │       ├── Inrows.js          # Modelo para la entidad "Inrows"
│   │       ├── LamparasEmergencia.js # Modelo para la entidad "Lámparas de Emergencia"
│   │       └── AiresAcondicionados.js # Modelo para la entidad "Aires Acondicionados"
│   └── migrations                 # Migraciones de la base de datos
│       └── init.sql              # Creación del esquema inicial
├── .env                          # Variables de entorno para la conexión a la base de datos
└── README.md                     # Documentación del proyecto
```

## Instalación

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Instala las dependencias necesarias utilizando `npm install`.
4. Configura el archivo `.env` con tus credenciales de base de datos.

## Uso

Para iniciar el sistema de monitoreo, ejecuta el siguiente comando:

```
npm start
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.