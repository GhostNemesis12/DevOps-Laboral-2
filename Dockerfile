# Imagen base: Node 18 sobre Alpine Linux
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el fichero app.js y la carpeta public (con HTML, CSS, etc.)
COPY app.js .
COPY public ./public

# Crear el directorio /data dentro del contenedor
RUN mkdir /data

# Puerto que usa la app
EXPOSE 8080

# Comando para arrancar la app
CMD ["node", "app.js"]