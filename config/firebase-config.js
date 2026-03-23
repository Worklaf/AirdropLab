// Firebase Configuration - Production с Environment Variables
// Работает на Cloudflare Pages как обычный скрипт
const firebaseConfig = {
    apiKey: globalThis.CF_API_KEY || null, // Убран бэкап ключ для безопасности
    authDomain: globalThis.CF_AUTH_DOMAIN || "testnet-hub.firebaseapp.com",
    projectId: globalThis.CF_PROJECT_ID || "testnet-hub",
    storageBucket: globalThis.CF_STORAGE_BUCKET || "testnet-hub.firebasestorage.app",
    messagingSenderId: globalThis.CF_MESSAGING_SENDER_ID || "497813176653",
    appId: globalThis.CF_APP_ID || "1:497813176653:web:089188fdd1555d76cd7704"
};

// Делаем доступным глобально
window.firebaseConfig = firebaseConfig;
