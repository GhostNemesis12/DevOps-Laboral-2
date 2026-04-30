const express = require('express');
const fs = require('fs');
const path = require('path');

// ============================================
// EÓLICA NARANCO S.L. - Sistema de gestión
// ============================================

const PUERTO = process.env.PUERTO || 8080;
const NOMBRE_PARQUE = process.env.NOMBRE_PARQUE || 'Eólica Naranco S.L.';
const RUTA_VISITAS = path.join(__dirname, 'data', 'visitas.txt');

// Lee el contador de visitas
function leerVisitas() {
  try {
    return parseInt(fs.readFileSync(RUTA_VISITAS, 'utf8')) || 0;
  } catch {
    return 0;
  }
}

// Guarda el contador de visitas
function guardarVisitas(n) {
  try {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
    fs.writeFileSync(RUTA_VISITAS, String(n));
  } catch (e) {
    console.error('Error guardando visitas:', e.message);
  }
}

// Inyecta variables en el HTML estático
function renderizarHTML(visitas) {
  let html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
  html = html.replace(/{{NOMBRE_PARQUE}}/g, NOMBRE_PARQUE);
  html = html.replace(/{{VISITAS}}/g, visitas);
  return html;
}

// ============================================
// SERVIDOR EXPRESS
// ============================================

const app = express();

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON (por si se necesita en otras rutas)
app.use(express.json());

// Contador global de visitas (se actualiza en cada petición a /)
app.use((req, res, next) => {
  if (req.url === '/' || req.url.startsWith('/?')) {
    const nuevasVisitas = leerVisitas() + 1;
    guardarVisitas(nuevasVisitas);
    req.visitas = nuevasVisitas;
  }
  next();
});

// Ruta principal
app.get('/', (req, res) => {
  const visitas = req.visitas || leerVisitas();
  const html = renderizarHTML(visitas);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// TAREA 2: Ruta /aerogeneradores
app.get('/aerogeneradores', (req, res) => {
  try {
    const htmlPath = path.join(__dirname, 'public', 'aerogeneradores.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    // Opcional: reemplazar variables como {{NOMBRE_PARQUE}}
    html = html.replace(/{{NOMBRE_PARQUE}}/g, NOMBRE_PARQUE);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error interno al cargar la página');
  }
});

// TAREA 5: Ruta /salud (estado del servidor)
app.get('/salud', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    visitas_totales: leerVisitas()
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send('<h1>404 - Ruta no encontrada</h1>');
});

// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`🌬️  ${NOMBRE_PARQUE} arrancado en puerto ${PUERTO}`);
});