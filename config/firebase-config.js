// Firebase Configuration - загружаем через API
// Работает на Cloudflare Pages with Functions

let firebaseConfig = null;
let configLoaded = false;

// Резервная конфигурация (Fallback), чтобы сайт не падал без API
const FALLBACK_CONFIG = {
  apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
  authDomain: "testnet-hub.firebaseapp.com",
  projectId: "testnet-hub",
  storageBucket: "testnet-hub.firebasestorage.app",
  messagingSenderId: "497813176653",
  appId: "1:497813176653:web:089188fdd1555d76cd7704"
};

// Функция загрузки конфигурации
async function loadFirebaseConfig() {
  if (configLoaded) return;
  
  try {
    console.log('🔧 Загружаем конфигурацию Firebase через API...');
    
    // Определяем базовый URL
    const baseUrl = window.location.origin;
    
    const response = await fetch(`${baseUrl}/api/config`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const config = await response.json();
    
    // Используем настоящий API ключ если доступен
    firebaseConfig = {
      apiKey: config.CF_API_KEY || FALLBACK_CONFIG.apiKey,
      authDomain: config.CF_AUTH_DOMAIN || FALLBACK_CONFIG.authDomain,
      projectId: config.CF_PROJECT_ID || FALLBACK_CONFIG.projectId,
      storageBucket: config.CF_STORAGE_BUCKET || FALLBACK_CONFIG.storageBucket,
      messagingSenderId: config.CF_MESSAGING_SENDER_ID || FALLBACK_CONFIG.messagingSenderId,
      appId: config.CF_APP_ID || FALLBACK_CONFIG.appId
    };
    
    // Устанавливаем ADMIN_UID глобально
    if (config.ADMIN_UID) {
      globalThis.ADMIN_UID = config.ADMIN_UID;
    }
    
    configLoaded = true;
    console.log('✅ Используем конфигурацию из API');
    
  } catch (error) {
    console.error('❌ Ошибка загрузки конфигурации:', error);
    console.log('🔧 Используем ЛОКАЛЬНУЮ резервную конфигурацию');
    
    // ВАЖНО: Сразу устанавливаем резервную конфигурацию
    firebaseConfig = FALLBACK_CONFIG;
    configLoaded = true;
  }
  
  // ВАЖНО: Устанавливаем глобально ПОСЛЕ завершения try/catch
  window.firebaseConfig = firebaseConfig;
  console.log('🌐 Firebase конфигурация установлена глобально');
}

// Загружаем конфигурацию асинхронно
loadFirebaseConfig();

// Для синхронного доступа СРАЗУ (если кто-то вызовет до загрузки)
window.firebaseConfig = window.firebaseConfig || FALLBACK_CONFIG;
