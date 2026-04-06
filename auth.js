// ═══════════════════════════════════════════════════════
// 📦 CENTRALIZED AUTHENTICATION SYSTEM
// ═══════════════════════════════════════════════════════

// ✅ ИСПРАВЛЕНИЕ: Импортируем напрямую, не полагаемся на window.*
import {
  getAuth,
  onAuthStateChanged as _onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

let auth = null;
let currentUser = null;
let isAdmin = false;

async function initAuth() {
  console.log('🔐 Initializing centralized auth system...');
  
  try {
    // ✅ Ждём firebase-config.js (он грузится синхронно перед нами)
    const maxWait = 3000;
    const t0 = Date.now();
    while (!window.firebaseConfig?.apiKey && Date.now() - t0 < maxWait) {
      await new Promise(r => setTimeout(r, 50));
    }

    if (!window.firebaseConfig?.apiKey) {
      console.warn('🔐 Firebase config not available after wait');
      return;
    }

    // ✅ Переиспользуем существующий app или создаём новый — только ОДИН раз
    let app;
    if (window.firebaseApp) {
      app = window.firebaseApp;
    } else if (getApps().length > 0) {
      app = getApps()[0];
      window.firebaseApp = app;
    } else {
      app = initializeApp(window.firebaseConfig);
      window.firebaseApp = app;
    }

    auth = getAuth(app);

    // ✅ Экспортируем в window для совместимости с остальным кодом
    window.auth = auth;
    window.currentUser = currentUser;
    window.isAdmin = isAdmin;

    // Немедленная проверка текущего пользователя
    const immediateUser = auth.currentUser;
    if (immediateUser) {
      console.log('🔐 User already logged in:', immediateUser.uid);
      currentUser = immediateUser;
      window.currentUser = immediateUser;
      isAdmin = immediateUser.uid === (window.ADMIN_UID || 'SAkz4mdW9reDaIsvqigCNZhEKJR2');
      window.isAdmin = isAdmin;
      updateAuthUI();
    }

    // ✅ Используем локальный импорт _onAuthStateChanged, не window.onAuthStateChanged
    _onAuthStateChanged(auth, async user => {
      currentUser = user;
      window.currentUser = user;
      isAdmin = !!(user && user.uid === (window.ADMIN_UID || 'SAkz4mdW9reDaIsvqigCNZhEKJR2'));
      window.isAdmin = isAdmin;
      
      console.log('🔐 Auth state changed:', { user: user?.uid, isAdmin });
      
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        localStorage.setItem('firebaseUser', JSON.stringify(userData));
        localStorage.setItem('__cache_isAdmin', isAdmin ? 'true' : 'false');
      } else {
        localStorage.removeItem('firebaseUser');
        localStorage.removeItem('__cache_isAdmin');
      }
      
      updateAuthUI();

      // ✅ Уведомляем другие системы через событие, не через window.onAuthStateChanged
      // (window.onAuthStateChanged занята Firebase SDK функцией)
      document.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user, isAdmin } }));
    });

    console.log('✅ Centralized auth system initialized');
  } catch (error) {
    console.error('🔐 Auth initialization error:', error);
  }
}

// ... остальные функции updateAuthUI, updateUserInfo, openLoginModal и т.д.
// (они не меняются — оставь как есть)

// ... window.logout, window.loginGoogle и т.д. — меняем только использование
// signOut/signInWithPopup теперь работают через локальный импорт:

window.loginGoogle = async function() {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    window.closeLoginModal?.();
    if (typeof showToast === 'function') showToast('Вход: Google');
  } catch (error) {
    console.error('Google login error:', error);
    if (typeof showToast === 'function') showToast(error.message);
  }
};

window.loginTwitter = async function() {
  try {
    await signInWithPopup(auth, new TwitterAuthProvider());
    window.closeLoginModal?.();
    if (typeof showToast === 'function') showToast('Вход: Twitter');
  } catch (error) {
    console.error('Twitter login error:', error);
    if (typeof showToast === 'function') showToast(error.message);
  }
};

window.handleEmailAuth = async function(event) {
  event?.preventDefault();
  const email = document.getElementById('emailInput')?.value;
  const password = document.getElementById('passInput')?.value;
  if (!email || !password) {
    if (typeof showToast === 'function') showToast('Введите email и пароль');
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.closeLoginModal?.();
    if (typeof showToast === 'function') showToast('Вход выполнен');
  } catch (error) {
    console.error('Email login error:', error);
    if (typeof showToast === 'function') showToast(error.message);
  }
};

window.handleRegister = async function(event) {
  event?.preventDefault();
  const email = document.getElementById('emailInput')?.value;
  const password = document.getElementById('passInput')?.value;
  if (!email || !password) {
    if (typeof showToast === 'function') showToast('Введите email и пароль');
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.closeLoginModal?.();
    if (typeof showToast === 'function') showToast('Аккаунт создан!');
  } catch (error) {
    console.error('Registration error:', error);
    if (typeof showToast === 'function') showToast(error.message);
  }
};

window.logout = async function() {
  try {
    await signOut(auth);
    currentUser = null;
    window.currentUser = null;
    isAdmin = false;
    window.isAdmin = false;
    updateAuthUI();
    if (typeof showToast === 'function') showToast('Выход выполнен');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

window.isLoggedIn = () => currentUser !== null;
window.getCurrentUser = () => currentUser;
window.isAdminUser = () => isAdmin;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}
