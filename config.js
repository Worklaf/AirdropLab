// Firebase Configuration - Конфиденциальные данные
// ПЕРЕМЕНИТЕ ЭТИ ДАННЫЕ В .env ИЛИ SERVER-SIDE
const firebaseConfig = {
    apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: "testnet-hub.firebaseapp.com",
    projectId: "testnet-hub",
    storageBucket: "testnet-hub.firebasestorage.app",
    messagingSenderId: "497813176653",
    appId: "1:497813176653:web:089188fdd1555d76cd7704"
};

// Экспорт для использования в основном файле
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig };
} else {
    window.firebaseConfig = firebaseConfig;
}
