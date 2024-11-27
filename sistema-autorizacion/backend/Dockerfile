# Dockerfile para el backend
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Establecer las variables de entorno para la configuración
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Compilar el proyecto
RUN npm run build

# Exponer el puerto del backend
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
