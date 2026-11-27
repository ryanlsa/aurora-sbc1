const CACHE='aurora-sbc-v20';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const OCR=['ocr.min.js','worker.min.js','reader-core.wasm.js','eng.traineddata.gz'].map(file=>new URL(file,self.registration.scope).href);
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await cache.addAll(CORE);
 await Promise.allSettled(OCR.map(url=>cache.add(url)));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith('aurora-sbc-')&&key!==CACHE)await caches.delete(key);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith((async()=>{
   const cache=await caches.open(CACHE),hit=await cache.match(event.request);
   if(hit)return hit;
   try{
     const response=await fetch(event.request);
     if(response.ok&&OCR.includes(event.request.url))await cache.put(event.request,response.clone());
     return response;
   }catch(error){if(event.request.mode==='navigate')return await cache.match('./index.html')||Response.error();throw error;}
 })());
});
