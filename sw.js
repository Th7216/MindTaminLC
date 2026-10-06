const CACHE_NAME="mtlc-pwa-v2";
const APP_SHELL=["./","./index.html","./manifest.webmanifest","./logo.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(resp=>{const copy=resp.clone();if(new URL(event.request.url).origin===location.origin){caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));}return resp;}).catch(()=>cached)));});
