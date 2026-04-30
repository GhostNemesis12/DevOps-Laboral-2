const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reto Artenis IT</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 48px;
          max-width: 600px;
          width: 90%;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .badge {
          background: #e94560;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 24px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        h1 { font-size: 2rem; margin-bottom: 12px; }
        p { color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 24px; }
        .status {
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 16px;
          margin-top: 24px;
          text-align: left;
        }
        .status-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #4ecca3; flex-shrink: 0; }
        .version { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">🚀 Artenis IT</span>
        <h1>Reto: Automatiza tu despliegue</h1>
        <p>Aplicación desplegada correctamente con Docker y CI/CD automático en Railway.</p>
        <div class="status">
          <div class="status-item"><div class="dot"></div> App funcionando en local ✓</div>
          <div class="status-item"><div class="dot"></div> Docker configurado ✓</div>
          <div class="status-item"><div class="dot"></div> Repositorio en GitHub ✓</div>
          <div class="status-item"><div class="dot"></div> Desplegado en Railway ✓</div>
          <div class="status-item"><div class="dot"></div> CI/CD activo — cada push actualiza ✓</div>
        </div>
        <p class="version">Entorno: ${process.env.NODE_ENV || 'development'} | Puerto: ${PORT}</p>
      </div>
    </body>
    </html>
  `);
});

// API de salud (útil para Railway)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
