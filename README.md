# Sistema de Monitoreo para Centro de Datos

Este proyecto es un sistema de monitoreo diseñado para gestionar y registrar datos de un centro de datos. Permite el seguimiento de diferentes aspectos críticos, incluyendo luces, inrows, lámparas de emergencia y aires acondicionados.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
monitor-centro-datos-frontend
├── public
│   ├── index.html                  # Página principal del sistema de monitoreo
│   ├── pages
│   │   ├── dashboard.html          # Resumen del estado del centro de datos
│   │   ├── luces.html              # Registro y visualización de datos de luces
│   │   ├── inrows.html             # Registro y visualización de datos de inrows
│   │   ├── lamparas-emergencia.html # Registro y visualización de lámparas de emergencia
│   │   └── aires-acondicionados.html # Registro y visualización de aires acondicionados
│   ├── components
│   │   ├── navbar.html             # Barra de navegación del sistema
│   │   ├── footer.html             # Pie de página del sistema
│   │   ├── forms
│   │   │   ├── luces-form.html     # Formulario para registrar datos de luces
│   │   │   ├── inrows-form.html    # Formulario para registrar datos de inrows
│   │   │   ├── lamparas-emergencia-form.html # Formulario para lámparas de emergencia
│   │   │   └── aires-acondicionados-form.html # Formulario para aires acondicionados
│   │   └── tables
│   │       ├── luces-table.html    # Tabla para mostrar datos de luces
│   │       ├── inrows-table.html   # Tabla para mostrar datos de inrows
│   │       ├── lamparas-emergencia-table.html # Tabla para lámparas de emergencia
│   │       └── aires-acondicionados-table.html # Tabla para aires acondicionados
│   ├── css
│   │   ├── main.css                # Estilos generales del sistema
│   │   └── pages
│   │       ├── luces.css           # Estilos específicos para la página de luces
│   │       ├── inrows.css          # Estilos específicos para la página de inrows
│   │       ├── lamparas-emergencia.css # Estilos específicos para lámparas de emergencia
│   │       └── aires-acondicionados.css # Estilos específicos para aires acondicionados
│   ├── js
│   │   ├── main.js                 # Lógica principal del sistema
│   │   ├── modules
│   │   │   ├── luces.js            # Lógica específica para datos de luces
│   │   │   ├── inrows.js           # Lógica específica para datos de inrows
│   │   │   ├── lamparas-emergencia.js # Lógica específica para lámparas de emergencia
│   │   │   └── aires-acondicionados.js # Lógica específica para aires acondicionados
│   │   └── utils
│   │       ├── dom.js              # Funciones utilitarias para manipulación del DOM
│   │       └── validation.js        # Funciones para validar datos ingresados
│   ├── assets
│   │   └── icons                   # Íconos utilizados en el sistema
│   └── vendor
│       └── bootstrap               # Archivos de Bootstrap utilizados en el proyecto
├── .editorconfig                   # Configuraciones para el editor de código
├── .gitignore                      # Archivos y directorios ignorados por Git
└── README.md                       # Documentación del proyecto
```

## Instalación

1. Clona el repositorio en tu máquina local.
2. Abre el archivo `public/index.html` en tu navegador para ver la aplicación en funcionamiento.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.