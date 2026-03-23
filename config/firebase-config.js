// Firebase Configuration - Production с Environment Variables
// Работает на Cloudflare Pages как обычный скрипт
const firebaseConfig = {
    // Production: Environment Variables (Cloudflare)
    apiKey: globalThis.CF_API_KEY || null,
    authDomain: globalThis.CF_AUTH_DOMAIN || "testnet-hub.firebaseapp.com",
    projectId: globalThis.CF_PROJECT_ID || "testnet-hub",
    storageBucket: globalThis.CF_STORAGE_BUCKET || "testnet-hub.firebasestorage.app",
    messagingSenderId: globalThis.CF_MESSAGING_SENDER_ID || "497813176653",
    appId: globalThis.CF_APP_ID || "1:497813176653:web:089188fdd1555d76cd7704"
};

// Для локальной разработки - если Environment Variables не доступны
if (!globalThis.CF_API_KEY) {
    console.warn('⚠️ Environment Variables не найдены. В production используйте Cloudflare Environment Variables.');
    console.log('💡 Для локальной разработки установите переменные окружения или используйте Cloudflare Pages.');
}

// Делаем доступным глобально
window.firebaseConfig = firebaseConfig;
