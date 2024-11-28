# Proyecto 4: Sistema automatizado de autorización segura para aplicaciones web en contenedores
## Introducción
En el contexto actual de la transformación digital, las aplicaciones web han adquirido un papel central en las operaciones de organizaciones de todos los tamaños. La adopción de contenedores ha facilitado la portabilidad y escalabilidad de estas aplicaciones, permitiendo despliegues más eficientes y consistentes. Sin embargo, con el aumento de la complejidad y la interconexión de sistemas, la seguridad y la gestión de autorizaciones se convierten en aspectos críticos que deben abordarse con rigor.

El proyecto: sistema automatizado de autorización segura para aplicaciones web en contenedores tiene como objetivo desarrollar una plataforma que integre la automatización del despliegue y la gestión de aplicaciones web en contenedores, con un enfoque robusto en la autorización y seguridad. Utilizando tecnologías modernas como JavaScript, TypeScript, Docker, Kubernetes y algoritmos de cifrado avanzados, se busca crear un sistema que no solo facilite la gestión eficiente de recursos en la nube, sino que también garantice la protección de la información sensible y las comunicaciones.

# Documentación del Proyecto 4
# Requisitos Previos
Antes de iniciar el proyecto, asegúrate de cumplir con los siguientes requisitos:
```bash
    Docker Desktop:
        Docker Desktop es esencial para gestionar contenedores de manera local.
        Descarga e instala Docker Desktop desde https://docs.docker.com/desktop/setup/install/linux/

    Verifica las Instalaciones:

    Comprueba que Docker y Docker Compose estén instalados correctamente:

      docker --version
      docker-compose --version
```

# Estructura del proyecto completo
```bash
Proyecto-Final/
├── sistema-autorizacion/
│   ├── backend/
│   │   ├── dist/                   # Archivos compilados de TypeScript
│   │   ├── node_modules/           # Dependencias instaladas
│   │   ├── logs/                   # Archivos de log generados
│   │   ├── src/                    # Código fuente del backend
│   │   │   ├── __test__/           # Pruebas unitarias
│   │   │   │   └── sample.test.ts  # Ejemplo de prueba
│   │   │   ├── controllers/        # Lógica de controladores
│   │   │   │   ├── authController.ts
│   │   │   │   ├── resourceController.ts
│   │   │   │   └── userController.ts
│   │   │   ├── middlewares/        # Middleware para autenticación y validaciones
│   │   │   │   ├── authMiddleware.ts
│   │   │   │   ├── errorHandler.ts
│   │   │   │   ├── logMiddleware.ts
│   │   │   │   └── validationMiddleware.ts
│   │   │   ├── models/             # Lógica de interacción con la base de datos
│   │   │   │   ├── logModel.ts
│   │   │   │   ├── resourceModel.ts
│   │   │   │   ├── testLog.ts
│   │   │   │   └── userModel.ts
│   │   │   ├── routes/             # Configuración de rutas
│   │   │   │   ├── authRoutes.ts
│   │   │   │   ├── logRoutes.ts
│   │   │   │   ├── resourceRoutes.ts
│   │   │   │   └── userRoutes.ts
│   │   │   ├── tests/              # Archivo para probar la conexión
│   │   │   │   └── testConnection.ts
│   │   │   ├── types/              # Tipos personalizados
│   │   │   │   └── express/index.d.ts
│   │   │   ├── utils/              # Utilidades
│   │   │   │   ├── hashUtil.ts
│   │   │   │   ├── jwtUtil.ts
│   │   │   │   └── logger.ts
│   │   │   ├── config.ts           # Configuración de conexión con la base de datos
│   │   │   ├── init-db.ts          # Inicialización de la base de datos
│   │   │   └── server.ts           # Punto de entrada del backend
│   │   ├── .env.docker             # Variables de entorno para Docker
│   │   ├── .env.local              # Variables de entorno para desarrollo local
│   │   ├── Dockerfile              # Dockerfile para el backend
│   │   ├── package-lock.json       # Archivo de dependencias bloqueadas
│   │   ├── package.json            # Definición de dependencias del proyecto
│   │   ├── test-db.js              # Script de prueba para conexión con PostgreSQL
│   │   └── tsconfig.json           # Configuración de TypeScript
│   │
│   ├── frontend/
│   │   ├── build/                  # Archivos compilados del frontend
│   │   ├── node_modules/           # Dependencias instaladas
│   │   ├── public/                 # Archivos estáticos públicos
│   │   ├── src/                    # Código fuente del frontend
│   │   │   ├── components/         # Componentes reutilizables
│   │   │   │   ├── Auth/           # Componentes de autenticación
│   │   │   │   │   ├── Login.tsx
│   │   │   │   │   └── Register.tsx
│   │   │   │   ├── Layout/         # Componentes de diseño
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   └── Navbar.tsx
│   │   │   │   ├── Resources/      # Gestión de recursos
│   │   │   │   │   ├── EditResourceForm.tsx
│   │   │   │   │   ├── ResourceForm.tsx
│   │   │   │   │   └── ResourceList.tsx
│   │   │   ├── pages/              # Páginas principales
│   │   │   │   ├── AdminUser.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Home.tsx
│   │   │   │   └── Profile.tsx
│   │   │   ├── services/           # Servicios para interacción con la API
│   │   │   │   └── apiService.ts
│   │   │   ├── App.css             # Estilos generales
│   │   │   ├── App.test.tsx        # Pruebas de React
│   │   │   ├── App.tsx             # Punto de entrada de la aplicación React
│   │   │   ├── index.css           # Estilos base
│   │   │   ├── index.tsx           # Punto de entrada principal
│   │   │   ├── react-app-env.d.ts  # Definiciones de React
│   │   │   ├── reportWebVitals.ts  # Reporte de métricas de rendimiento
│   │   │   └── setupTests.ts       # Configuración para pruebas
│   │   ├── .env.docker             # Variables de entorno para Docker
│   │   ├── .env.local              # Variables de entorno para desarrollo local
│   │   ├── Dockerfile              # Dockerfile para el frontend
│   │   ├── jest.config.ts          # Configuración de Jest
│   │   ├── package-lock.json       # Archivo de dependencias bloqueadas
│   │   ├── package.json            # Definición de dependencias del proyecto
│   │   └── tsconfig.json           # Configuración de TypeScript
│   │
│   ├── database/
│   │   └── init.sql                # Script de inicialización de la base de datos
│   │
│   ├── docker-compose.yml          # Configuración de servicios con Docker Compose
│
├── .gitignore                      # Archivos y carpetas ignoradas por Git
```
