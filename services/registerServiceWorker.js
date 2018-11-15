
import firebase from '@/services/firebase';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
            console.log('[SW] Service worker registered', registration);
            firebase.messaging().useServiceWorker(registration);
        });
}
