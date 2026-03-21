// Firebase Configuration - Production с Environment Variables
// Работает на Cloudflare Pages
const firebaseConfig = {
    apiKey: import.meta.env.CF_API_KEY || "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: import.meta.env.CF_AUTH_DOMAIN || "testnet-hub.firebaseapp.com",
    projectId: import.meta.env.CF_PROJECT_ID || "testnet-hub",
    storageBucket: import.meta.env.CF_STORAGE_BUCKET || "testnet-hub.firebasestorage.app",
    messagingSenderId: import.meta.env.CF_MESSAGING_SENDER_ID || "497813176653",
    appId: import.meta.env.CF_APP_ID || "1:497813176653:web:089188fdd1555d76cd7704"
};

// Экспорт для использования в основном файле
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig };
} else {
    window.firebaseConfig = firebaseConfig;
}
