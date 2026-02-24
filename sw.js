const CACHE_NAME = 'gerisay-v2';
const assets = ['./', './index.html', './manifest.json', './icon.png'];

// Dosyaları Önbelleğe Al
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

// Çevrimdışı Destek
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

// BİLDİRİM YAKALAYICI (PUSH EVENT)
self.addEventListener('push', function(event) {
    let data = { title: 'GeriSay', body: 'Bir süreniz doldu kral!' };
    try {
        if (event.data) {
            data = event.data.json();
        }
    } catch (e) {
        data.body = event.data.text();
    }

    const options = {
        body: data.body,
        icon: 'icon.png',
        badge: 'icon.png',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});

// Bildirime Tıklanınca Uygulamayı Aç
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('./'));
});