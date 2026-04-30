# Eólica Naranco S.L. - Sistema de gestión - Laboral 2 "Los Currantes"

App Node.js del sistema de gestión del parque eólico de la sierra del Aramo, versión branch por el grupo de trabajo Laboral 2 alias "Los Currantes".

## Arrancar en local

```bash
node app.js
```

Accede en http://localhost:8080

## 📁 Estructura del proyecto

```
DevOps-Laboral-2/
├── app.js                  # Servidor Express (rutas, middlewares, lógica)
├── Dockerfile              # Receta de construcción del contenedor
├── .env                    # Variables sensibles (NO se sube al repo)
├── .gitignore              # Excluye .env, node_modules, data/
├── package.json            # Dependencias y metadatos del proyecto
├── Guia.md                 # Guía paso a paso de las tareas DevOps
├── README.md               # Este documento
└── public/                 # Recursos estáticos del frontend
    ├── index.html          # Panel de control principal
    ├── aerogeneradores.html # Página de aerogeneradores
    └── css/
        ├── styles.css           # Estilos del panel de control
        └── aerogeneradores.css  # Estilos de la tabla de aerogeneradores
```

## 🐳 Arrancar con Docker

```bash
# Construir la imagen
docker build -t eolica .

# Arrancar el contenedor (básico)
docker run -d -p 8080:8080 --name mi-eolica eolica

# Arrancar con variables de entorno y volumen
docker run -d -p 8080:8080 --name mi-eolica --env-file .env -v eolica-data:/data eolica
```

Accede en http://localhost:8080

## 🔗 Endpoints

| Ruta | Descripción |
|------|-------------|
| `GET /` | Panel de control principal |
| `GET /aerogeneradores` | Tabla de los 12 aerogeneradores por sector |
| `GET /salud` | Healthcheck JSON con estado del servidor |

## ⚙️ Variables de entorno

| Variable | Ubicación | Descripción |
|----------|-----------|-------------|
| `PUERTO` | Dockerfile (`ENV`) | Puerto de escucha (default: 8080) |
| `NOMBRE_PARQUE` | Dockerfile (`ENV`) | Nombre del parque eólico |
| `CLAVE_MANTENIMIENTO` | `.env` | Clave de mantenimiento (sensible) |
| `ADMIN_EMAIL` | `.env` | Email del administrador (sensible) |

## 🛠️ Tecnologías

- **Node.js 18** (Alpine Linux)
- **Express** — framework web
- **dotenv** — carga de variables de entorno
- **Docker** — contenedorización

