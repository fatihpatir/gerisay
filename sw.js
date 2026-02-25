self.addEventListener('push', function(event) {
    let icerik = 'Zaman doldu.';
    if (event.data) {
        try {
            const data = event.data.json();
            icerik = data.body || data.message || icerik;
        } catch (e) {
            icerik = event.data.text();
        }
    }

    const secenekler = {
        body: icerik,
        icon: 'icon.png',
        badge: 'icon.png',
        tag: 'gerisay-sistem', 
        renotify: true,
        vibrate: [100, 50, 100],
        data: { url: './' }
    };

    event.waitUntil(self.registration.showNotification('GeriSay Pro', secenekler));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(pencereler => {
            for (var i = 0; i < pencereler.length; i++) {
                if (pencereler[i].url.includes(location.origin) && 'focus' in pencereler[i]) return pencereler[i].focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});