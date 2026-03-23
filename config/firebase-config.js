// Firebase Configuration - Production с Environment Variables
// Работает на Cloudflare Pages как обычный скрипт

// Отладка: проверяем все доступные переменные
console.log('🔍 Debug Environment Variables:', {
    CF_API_KEY: globalThis.CF_API_KEY ? 'EXISTS' : 'MISSING',
    CF_AUTH_DOMAIN: globalThis.CF_AUTH_DOMAIN,
    CF_PROJECT_ID: globalThis.CF_PROJECT_ID,
    CF_STORAGE_BUCKET: globalThis.CF_STORAGE_BUCKET,
    CF_MESSAGING_SENDER_ID: globalThis.CF_MESSAGING_SENDER_ID,
    CF_APP_ID: globalThis.CF_APP_ID,
    ADMIN_UID: globalThis.ADMIN_UID ? 'EXISTS' : 'MISSING',
    allGlobalThis: Object.keys(globalThis).filter(k => k.startsWith('CF_') || k === 'ADMIN_UID')
});

const firebaseConfig = {
    // Production: Environment Variables (Cloudflare)
    apiKey: globalThis.CF_API_KEY || "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: globalThis.CF_AUTH_DOMAIN || "testnet-hub.firebaseapp.com",
    projectId: globalThis.CF_PROJECT_ID || "testnet-hub",
    storageBucket: globalThis.CF_STORAGE_BUCKET || "testnet-hub.firebasestorage.app",
    messagingSenderId: globalThis.CF_MESSAGING_SENDER_ID || "497813176653",
    appId: globalThis.CF_APP_ID || "1:497813176653:web:089188fdd1555d76cd7704"
};

// Логирование для отладки
if (!globalThis.CF_API_KEY) {
    console.log('🔧 Используем локальный Firebase API ключ (development mode)');
} else {
    console.log('✅ Используем Environment Variables (production mode)');
}

// Делаем доступным глобально
window.firebaseConfig = firebaseConfig;
