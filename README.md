# Eólica Naranco S.L. - Sistema de gestión - Laboral 2 "Los Currantes"

App Node.js del sistema de gestión del parque eólico de la sierra del Aramo, versión branch por el grupo de trabajo Laboral 2 alias "Los Currantes".

## Arrancar en local

```bash
node app.js
```

Accede en http://localhost:8080

## 📁 Estructura

- **`app.js` — servidor principal**  
  Es el núcleo del backend usando Express. Se encarga de:
  - Crear y configurar el servidor HTTP
  - Definir rutas (`/`, `/health`, etc.)
  - Servir archivos estáticos desde la carpeta `public`
  - Gestionar middlewares (`express.json()`, etc.)
  - Arrancar la aplicación en el puerto definido

---

- **`public/` — recursos del frontend**  
  Contiene todos los archivos que se envían directamente al navegador:
  - `index.html` → estructura de la página
  - `styles.css` → estilos visuales
  - `script.js` (opcional) → lógica en cliente

  Todo lo que esté aquí se sirve automáticamente gracias a:
  ```js
  app.use(express.static('public'));
