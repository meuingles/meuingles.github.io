/* Meu Inglês: service worker (funciona sem internet) */
const CACHE = 'meu-ingles-v3';
const ARQS = ['./', './index.html', './app.js?v=3', './conteudo.js?v=3', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;
  if (r.mode === 'navigate') {
    // página: tenta a versão nova primeiro; sem internet, usa a guardada
    e.respondWith(
      fetch(r).then(resp => { const cp = resp.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return resp; })
        .catch(() => caches.match('./index.html').then(m => m || caches.match('./')))
    );
    return;
  }
  // arquivos com versão (?v=): usa o guardado; se não tiver, baixa e guarda
  e.respondWith(
    caches.match(r).then(m => m || fetch(r).then(resp => { if (resp.ok) { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return resp; }))
  );
});
