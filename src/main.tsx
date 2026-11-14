import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.addEventListener('error', (event) => {
  document.body.innerHTML = `<div style="background:#0f172a;color:#f87171;padding:24px;font-family:monospace;min-height:100vh">
    <h2 style="color:#fff">Erro encontrado:</h2>
    <pre style="white-space:pre-wrap;word-break:break-word">${event.message}\n\n${event.filename}:${event.lineno}</pre>
  </div>`;
});

window.addEventListener('unhandledrejection', (event) => {
  document.body.innerHTML = `<div style="background:#0f172a;color:#fbbf24;padding:24px;font-family:monospace;min-height:100vh">
    <h2 style="color:#fff">Erro de conexão/dados:</h2>
    <pre style="white-space:pre-wrap;word-break:break-word">${event.reason}</pre>
  </div>`;
});

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (err: any) {
  document.body.innerHTML = `<div style="background:#0f172a;color:#f87171;padding:24px;font-family:monospace;min-height:100vh">
    <h2 style="color:#fff">Erro ao iniciar o app:</h2>
    <pre style="white-space:pre-wrap;word-break:break-word">${err?.stack || err}</pre>
  </div>`;
}
