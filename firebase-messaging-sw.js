importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCnYTd7_7xa1JuEvnsPRD0mSUFqbEH9Kjs",
  authDomain: "gerisay-854ed.firebaseapp.com",
  projectId: "gerisay-854ed",
  storageBucket: "gerisay-854ed.firebasestorage.app",
  messagingSenderId: "828817946345",
  appId: "1:828817946345:web:56de16e6d0cf85e5f92278"
});

const messaging = firebase.messaging();

// Uygulama tamamen kapalıyken bildirimi yakalayan kısım
messaging.onBackgroundMessage((payload) => {
  console.log('Arka planda bildirim geldi kral:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});