self.addEventListener('push', function(event) {
    let payload = 'Süre doldu kral!';
    
    if (event.data) {
        try {
            // Eğer veri JSON ise başlığı ve mesajı al
            const data = event.data.json();
            payload = data.body || data.message || payload;
        } catch (e) {
            // Eğer veri düz metin ise direkt onu al
            payload = event.data.text();
        }
    }

    const options = {
        body: payload,
        icon: 'icon.png',
        badge: 'icon.png',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification('GeriSay Bildirimi', options)
    );
});

// Bildirime tıklayınca uygulamayı aç
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('./'));
});