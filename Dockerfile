# Usa la imagen oficial de Node.js 18 (versión ligera Alpine)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias primero (optimiza caché de Docker)
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --production

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que usa la app
EXPOSE 3000

# Variable de entorno por defecto
ENV NODE_ENV=production

# Comando para iniciar la app
CMD ["node", "app.js"]
