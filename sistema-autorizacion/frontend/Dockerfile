# Dockerfile para el frontend
FROM node:16-alpine as build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa para servir la aplicación con nginx
FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto del frontend
EXPOSE 80

# Comando por defecto para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
