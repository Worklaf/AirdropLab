// Firebase Configuration - Production с Environment Variables
// Работает на Cloudflare Pages
const firebaseConfig = {
    apiKey: typeof CF_API_KEY !== 'undefined' ? CF_API_KEY : "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: typeof CF_AUTH_DOMAIN !== 'undefined' ? CF_AUTH_DOMAIN : "testnet-hub.firebaseapp.com",
    projectId: typeof CF_PROJECT_ID !== 'undefined' ? CF_PROJECT_ID : "testnet-hub",
    storageBucket: typeof CF_STORAGE_BUCKET !== 'undefined' ? CF_STORAGE_BUCKET : "testnet-hub.firebasestorage.app",
    messagingSenderId: typeof CF_MESSAGING_SENDER_ID !== 'undefined' ? CF_MESSAGING_SENDER_ID : "497813176653",
    appId: typeof CF_APP_ID !== 'undefined' ? CF_APP_ID : "1:497813176653:web:089188fdd1555d76cd7704"
};

// Экспорт для использования в основном файле
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig };
} else {
    window.firebaseConfig = firebaseConfig;
}
