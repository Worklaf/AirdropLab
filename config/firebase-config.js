// Firebase Configuration - загружаем через API
// Работает на Cloudflare Pages с Functions

let firebaseConfig = null;
let configLoaded = false;

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
    
    // Если API ключ доступен через API, используем его
    if (config.hasApiKey) {
      // Для API ключа нужно делать отдельный запрос или передавать через заголовки
      console.log('� API ключ доступен через сервер');
      firebaseConfig = {
        apiKey: await getApiKeyFromServer(), // Получаем ключ безопасно
        authDomain: config.CF_AUTH_DOMAIN,
        projectId: config.CF_PROJECT_ID,
        storageBucket: config.CF_STORAGE_BUCKET,
        messagingSenderId: config.CF_MESSAGING_SENDER_ID,
        appId: config.CF_APP_ID
      };
    } else {
      console.log('⚠️ API ключ недоступен, используем fallback');
      firebaseConfig = {
        apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
        authDomain: config.CF_AUTH_DOMAIN,
        projectId: config.CF_PROJECT_ID,
        storageBucket: config.CF_STORAGE_BUCKET,
        messagingSenderId: config.CF_MESSAGING_SENDER_ID,
        appId: config.CF_APP_ID
      };
    }
    
    configLoaded = true;
    console.log('✅ Конфигурация Firebase загружена');
    
  } catch (error) {
    console.error('❌ Ошибка загрузки конфигурации:', error);
    console.log('🔧 Используем локальную конфигурацию');
    
    // Fallback конфигурация
    firebaseConfig = {
      apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
      authDomain: "testnet-hub.firebaseapp.com",
      projectId: "testnet-hub",
      storageBucket: "testnet-hub.firebasestorage.app",
      messagingSenderId: "497813176653",
      appId: "1:497813176653:web:089188fdd1555d76cd7704"
    };
    
    configLoaded = true;
  }
}

// Функция получения API ключа (можно реализовать через серверный endpoint)
async function getApiKeyFromServer() {
  // Временно возвращаем fallback, потом можно реализовать через сервер
  return "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk";
}

// Загружаем конфигурацию асинхронно
loadFirebaseConfig().then(() => {
  // Делаем доступным глобально после загрузки
  window.firebaseConfig = firebaseConfig;
  console.log('🌐 Firebase конфигурация установлена глобально');
});

// Для синхронного доступа (если кто-то вызовет сразу)
window.firebaseConfig = firebaseConfig || {
  apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
  authDomain: "testnet-hub.firebaseapp.com",
  projectId: "testnet-hub",
  storageBucket: "testnet-hub.firebasestorage.app",
  messagingSenderId: "497813176653",
  appId: "1:497813176653:web:089188fdd1555d76cd7704"
};
