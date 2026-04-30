# 🚀 Reto Artenis IT — Automatiza tu despliegue

Aplicación Node.js con Docker y CI/CD automático en Railway.

---

## 📋 Qué hace esta app

Una API web con Express que:
- Sirve una página principal con el estado del despliegue
- Expone `/health` para comprobaciones de estado (Railway la usa)
- Funciona igual en local, en Docker y en la nube

---

## 🖥️ Paso 1 — Ejecutar en local

```bash
# Instalar dependencias
npm install

# Arrancar la app
npm start

# Abrir en el navegador
http://localhost:3000
```

---

## 🐳 Paso 2 y 3 — Docker

### Construir la imagen
```bash
docker build -t artenis-app .
```

### Ejecutar el contenedor
```bash
docker run -p 3000:3000 artenis-app
```

### Verificar que funciona
```bash
curl http://localhost:3000/health
```

Deberías ver: `{"status":"ok","timestamp":"..."}`

---

## 📤 Paso 4 — Subir a GitHub

```bash
git init
git add .
git commit -m "primer commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

---

## ☁️ Paso 5 — Desplegar en Railway

1. Crear cuenta en [railway.app](https://railway.app)
2. Clic en **New Project → Deploy from GitHub repo**
3. Seleccionar este repositorio
4. Railway detecta el `Dockerfile` automáticamente y despliega
5. En **Settings → Networking** → asignar un dominio público

---

## ⚡ Paso 6 — CI/CD automático (GitHub Actions)

El archivo `.github/workflows/deploy.yml` automatiza el despliegue.

**Configuración necesaria:**
1. En Railway: **Account Settings → API Tokens** → copiar el token
2. En GitHub: **Settings → Secrets → Actions** → crear secreto `RAILWAY_TOKEN`

**Flujo automático:**
```
git add .
git commit -m "cambio en la app"
git push
   ↓
GitHub Actions ejecuta los tests
   ↓
Si pasan → Railway redespliega automáticamente
   ↓
URL pública actualizada (sin intervención manual)
```

---

## 🐛 Solución de errores frecuentes

| Error | Causa | Solución |
|---|---|---|
| App no arranca | Error en `app.js` | Revisar logs: `node app.js` |
| Puerto incorrecto | Hardcoded en lugar de `process.env.PORT` | Usar `process.env.PORT \|\| 3000` |
| Docker falla | Dependencias no instaladas | Revisar `RUN npm install` en Dockerfile |
| Deploy falla | `RAILWAY_TOKEN` no configurado | Añadir el secreto en GitHub |
| URL no responde | Puerto no expuesto | Verificar `EXPOSE 3000` y networking en Railway |

---

## ✅ Checklist del reto

- [ ] App funciona en local (`npm start`)
- [ ] Docker funciona (`docker build` + `docker run`)
- [ ] Código en GitHub con Dockerfile incluido
- [ ] App desplegada con URL pública
- [ ] CI/CD activo: cada `push` actualiza la app

---

## 🤔 ¿Podría otra persona ejecutar tu app sin tu ayuda?

> Si la respuesta es **sí** → lo estás haciendo bien  
> Si la respuesta es **no** → revisa el Dockerfile

*Reto propuesto por [Miguel Sanchez Cuervo](https://www.linkedin.com/in/mmsanchezcuervo/) — Artenis IT*
