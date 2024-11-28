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
│   │   ├── dist/                  
│   │   ├── node_modules/           
│   │   ├── logs/                   
│   │   ├── src/                    
│   │   │   ├── __test__/           
│   │   │   │   └── sample.test.ts  
│   │   │   ├── controllers/        
│   │   │   │   ├── authController.ts
│   │   │   │   ├── resourceController.ts
│   │   │   │   └── userController.ts
│   │   │   ├── middlewares/        
│   │   │   │   ├── authMiddleware.ts
│   │   │   │   ├── errorHandler.ts
│   │   │   │   ├── logMiddleware.ts
│   │   │   │   └── validationMiddleware.ts
│   │   │   ├── models/             
│   │   │   │   ├── logModel.ts
│   │   │   │   ├── resourceModel.ts
│   │   │   │   ├── testLog.ts
│   │   │   │   └── userModel.ts
│   │   │   ├── routes/             
│   │   │   │   ├── authRoutes.ts
│   │   │   │   ├── logRoutes.ts
│   │   │   │   ├── resourceRoutes.ts
│   │   │   │   └── userRoutes.ts
│   │   │   ├── tests/             
│   │   │   │   └── testConnection.ts
│   │   │   ├── types/              
│   │   │   │   └── express/index.d.ts
│   │   │   ├── utils/              
│   │   │   │   ├── hashUtil.ts
│   │   │   │   ├── jwtUtil.ts
│   │   │   │   └── logger.ts
│   │   │   ├── config.ts           
│   │   │   ├── init-db.ts          
│   │   │   └── server.ts         
│   │   ├── .env.docker             
│   │   ├── .env.local              
│   │   ├── Dockerfile              
│   │   ├── package-lock.json       
│   │   ├── package.json            
│   │   ├── test-db.js              
│   │   └── tsconfig.json           
│   │
│   ├── frontend/
│   │   ├── build/                  
│   │   ├── node_modules/           
│   │   ├── public/                 
│   │   ├── src/                    
│   │   │   ├── components/         
│   │   │   │   ├── Auth/           
│   │   │   │   │   ├── Login.tsx
│   │   │   │   │   └── Register.tsx
│   │   │   │   ├── Layout/         
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   └── Navbar.tsx
│   │   │   │   ├── Resources/      
│   │   │   │   │   ├── EditResourceForm.tsx
│   │   │   │   │   ├── ResourceForm.tsx
│   │   │   │   │   └── ResourceList.tsx
│   │   │   ├── pages/              
│   │   │   │   ├── AdminUser.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Home.tsx
│   │   │   │   └── Profile.tsx
│   │   │   ├── services/           
│   │   │   │   └── apiService.ts
│   │   │   ├── App.css             
│   │   │   ├── App.test.tsx        
│   │   │   ├── App.tsx             
│   │   │   ├── index.css           
│   │   │   ├── index.tsx           
│   │   │   ├── react-app-env.d.ts  
│   │   │   ├── reportWebVitals.ts 
│   │   │   └── setupTests.ts      
│   │   ├── .env.docker             
│   │   ├── .env.local             
│   │   ├── Dockerfile              
│   │   ├── jest.config.ts         
│   │   ├── package-lock.json       
│   │   ├── package.json            
│   │   └── tsconfig.json           
│   │
│   ├── database/
│   │   └── init.sql                
│   │
│   ├── docker-compose.yml          
│
├── .gitignore                      
```

# Configuracion del proyecto
- Clona este repositorio que contiene el proyecto usando: git clone
- Una vez que hayas establecido tu archivo de clonacion usa docker compose up --build para crear en la carpeta sistema-autorizacion para construir las imagenes de Docker para cada servicio (backend, frontend y base de datos) y levantar los contenedores interconectados.
- En este proyecto, Docker Compose se encarga de instalar las dependencias automaticamente. Aquí detallamos las dependencias especificas y sus propositos.

## Backend:
```bash
Navega al directorio backend:
cd backend
```

### Dependencias principales (definidas en package.json):
- express: Framework web para manejar solicitudes HTTP.
- pg: Cliente de PostgreSQL para interactuar con la base de datos.
- jsonwebtoken: Manejo de tokens JWT para autenticación.
- bcrypt: Cifrado de contraseñas.
- dotenv: Manejo de variables de entorno.
- winston: Registro de logs.

### Dependencias de desarrollo:
- typescript: Tipado estático.
- ts-node-dev: Ejecución en desarrollo.
- jest: Pruebas unitarias.
- Tipos (@types): Aseguran compatibilidad con TypeScript.

Frontend:
```bash
    Navega al directorio frontend:

    cd frontend
```
### Dependencias principales (definidas en package.json):
- react y react-dom: Biblioteca principal de la interfaz.
- axios: Cliente HTTP para consumir la API.
- react-router-dom: Manejo de rutas en React.
- Dependencias de desarrollo:
- typescript: Tipado estático.
- jest: Pruebas unitarias.
- Tipos (@types): Compatibilidad con TypeScript.

## Base de Datos:
El script database/init.sql define la estructura inicial:
- Tablas: usuarios, recursos, logs.
- Índices: Optimización para consultas rápidas.
- Datos iniciales: Usuario administrador y logs.

