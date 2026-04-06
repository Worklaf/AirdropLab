// 🌐 Универсальная загрузка Firebase-конфига
// Работает на Vercel, Cloudflare Pages и локально

let firebaseConfig = null;
let configLoaded = false;

async function loadFirebaseConfig() {
  if (configLoaded) return;

  try {
    console.log("🔧 Определяем платформу...");

    const isVercel = !!window.NEXT_PUBLIC_FIREBASE_API_KEY || !!process.env?.NEXT_PUBLIC_FIREBASE_API_KEY;
    const isCloudflare = window.location.origin.includes("airdroplab.org");

    // ============================
    // 1️⃣ VERCEL (NEXT_PUBLIC_*)
    // ============================
    if (isVercel) {
      console.log("🚀 Загружаем конфиг из Vercel ENV");

      firebaseConfig = {
        apiKey: window.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: window.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: window.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: window.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: window.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: window.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      };

      if (process.env?.NEXT_PUBLIC_ADMIN_UID) {
        window.ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID;
      }

      configLoaded = true;
      window.firebaseConfig = firebaseConfig;
      console.log("🌐 Firebase конфигурация установлена (Vercel)");
      return;
    }

    // ==========================================
    // 2️⃣ CLOUDFLARE PAGES — загрузка через API
    // ==========================================
    if (isCloudflare) {
      console.log("☁️ Cloudflare Pages: загружаем /api/config");

      const response = await fetch(`${window.location.origin}/api/config`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const config = await response.json();

      firebaseConfig = {
        apiKey: config.CF_API_KEY,
        authDomain: config.CF_AUTH_DOMAIN,
        projectId: config.CF_PROJECT_ID,
        storageBucket: config.CF_STORAGE_BUCKET,
        messagingSenderId: config.CF_MESSAGING_SENDER_ID,
        appId: config.CF_APP_ID
      };

      if (config.ADMIN_UID) window.ADMIN_UID = config.ADMIN_UID;

      configLoaded = true;
      window.firebaseConfig = firebaseConfig;
      console.log("🌐 Firebase конфигурация установлена (Cloudflare)");
      return;
    }

    // ============================
    // 3️⃣ ЛОКАЛЬНЫЙ FALLBACK
    // ============================
    throw new Error("Не удалось определить платформу");

  } catch (error) {
    console.error("❌ Ошибка загрузки конфигурации:", error);
    console.log("⚠️ Используем fallback Firebase config");

    firebaseConfig = {
      apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
      authDomain: "testnet-hub.firebaseapp.com",
      projectId: "testnet-hub",
      storageBucket: "testnet-hub.firebasestorage.app",
      messagingSenderId: "497813176653",
      appId: "1:497813176653:web:089188fdd1555d76cd7704"
    };

    configLoaded = true;
    window.firebaseConfig = firebaseConfig;
  }
}

// Инициализация
loadFirebaseConfig();
