// Firebase Configuration - Конфиденциальные данные
// ПЕРЕМЕСТИТЕ ЭТИ ДАННЫЕ В .env ИЛИ SERVER-SIDE
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "testnet-hub.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "testnet-hub",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "testnet-hub.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "497813176653",
    appId: process.env.FIREBASE_APP_ID || "1:497813176653:web:089188fdd1555d76cd7704"
};

// Admin Configuration
// Экспорт для использования в основном файле
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig };
} else {
    window.firebaseConfig = firebaseConfig;
}
