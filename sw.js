self.addEventListener('push', function(event) {
    let payload = 'Süre doldu kral!';
    
    if (event.data) {
        try {
            const data = event.data.json();
            payload = data.body || data.message || payload;
        } catch (e) {
            payload = event.data.text();
        }
    }

    const options = {
        body: payload,
        icon: 'icon.png',
        badge: 'icon.png',
        // 'tag' aynı bildirimlerin üst üste binmesini ve tekrar etmesini engeller
        tag: 'gerisay-bildirim-tekil', 
        renotify: true,
        vibrate: [200, 100, 200],
        data: {
            url: './' // Bildirime tıklayınca gidilecek yer
        }
    };

    event.waitUntil(
        self.registration.showNotification('GeriSay', options)
    );
});

// Bildirime tıklandığında yapılacak işlemler
self.addEventListener('notificationclick', function(event) {
    // 1. Bildirimi panelden anında sil
    event.notification.close();

    // 2. Eğer uygulama açıksa ona odaklan, kapalıysa yeni pencere aç
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.includes(location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});