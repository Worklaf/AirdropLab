// ═══════════════════════════════════════════════════════
// 📦 CENTRALIZED AUTHENTICATION SYSTEM
// ═════════════════════════════════════════════════════════
// Единая система входа для всех страниц сайта
// Подключается: <script src="auth.js"></script>
// ═══════════════════════════════════════════════════════════════

// Импорт Firebase Auth функций
import {
  getAuth, onAuthStateChanged, signOut, signInWithPopup,
  GoogleAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, initializeApp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Глобальные переменные для аутентификации
let auth = null;
let currentUser = null;
let isAdmin = false;

// Инициализация аутентификации
async function initAuth() {
  console.log('🔐 Initializing centralized auth system...');
  
  try {
    // Используем существующий Firebase app или создаем новый
    if (window.firebaseApp) {
      auth = getAuth(window.firebaseApp);
    } else if (window.firebaseConfig) {
      const app = initializeApp(window.firebaseConfig);
      auth = getAuth(app);
      window.firebaseApp = app;
    } else {
      console.warn('🔐 No Firebase config available');
      return;
    }

    // Делаем доступным глобально
    window.auth = auth;
    window.currentUser = currentUser;
    window.isAdmin = isAdmin;

    // Проверяем текущего пользователя
    const immediateUser = auth.currentUser;
    if (immediateUser) {
      console.log('🔐 User already logged in:', immediateUser.uid);
      currentUser = immediateUser;
      window.currentUser = immediateUser;
      isAdmin = immediateUser.uid === (window.ADMIN_UID || 'SAkz4mdW9reDaIsvqigCNZhEKJR2');
      updateAuthUI();
    }

    // Отслеживаем изменения состояния аутентификации
    onAuthStateChanged(auth, async user => {
      currentUser = user;
      window.currentUser = user;
      isAdmin = user && user.uid === (window.ADMIN_UID || 'SAkz4mdW9reDaIsvqigCNZhEKJR2');
      
      console.log('🔐 Auth state changed:', { user: user?.uid, isAdmin });
      
      // Обновляем UI на всех страницах
      updateAuthUI();
      
      // Генерируем событие для других скриптов
      if (typeof window.onAuthStateChanged === 'function') {
        window.onAuthStateChanged(user);
      }
    });

    console.log('✅ Centralized auth system initialized');
  } catch (error) {
    console.error('🔐 Auth initialization error:', error);
  }
}

// Обновление UI элементов аутентификации
function updateAuthUI() {
  // Обновляем кнопки входа/выхода
  const loggedOutElements = document.querySelectorAll('.auth-logged-out');
  const loggedInElements = document.querySelectorAll('.auth-logged-in');
  
  if (currentUser) {
    // Пользователь вошел - скрываем кнопки входа, показываем профиль
    loggedOutElements.forEach(el => el.style.display = 'none');
    loggedInElements.forEach(el => el.style.display = 'flex');
    
    // Обновляем информацию о пользователе
    updateUserInfo();
  } else {
    // Пользователь не вошел - показываем кнопки входа, скрываем профиль
    loggedOutElements.forEach(el => el.style.display = 'flex');
    loggedInElements.forEach(el => el.style.display = 'none');
  }
}

// Обновление информации о пользователе
function updateUserInfo() {
  if (!currentUser) return;
  
  // Avatar
  const avatarElements = document.querySelectorAll('.user-avatar');
  avatarElements.forEach(el => {
    el.src = currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
    el.onerror = function() {
      this.src = 'https://www.gravatar.com/avatar/?d=mp';
    };
  });
  
  // Name
  const nameElements = document.querySelectorAll('.user-name');
  nameElements.forEach(el => {
    el.textContent = currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'User');
  });
  
  // Email
  const emailElements = document.querySelectorAll('.user-email');
  emailElements.forEach(el => {
    el.textContent = currentUser.email || '';
  });
}

// Функции входа
window.openLoginModal = function() {
  console.log('🔐 Opening login modal...');
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
    console.log('🔐 Modal should be visible now');
  } else {
    console.error('🔐 Login modal element not found!');
  }
};

window.closeLoginModal = function() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
  }
};

window.loginGoogle = async function() {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    closeLoginModal();
    if (typeof showToast === 'function') {
      showToast('Вход: Google');
    }
  } catch (error) {
    console.error('Google login error:', error);
    if (typeof showToast === 'function') {
      showToast(error.message);
    }
  }
};

window.loginTwitter = async function() {
  try {
    await signInWithPopup(auth, new TwitterAuthProvider());
    closeLoginModal();
    if (typeof showToast === 'function') {
      showToast('Вход: Twitter');
    }
  } catch (error) {
    console.error('Twitter login error:', error);
    if (typeof showToast === 'function') {
      showToast(error.message);
    }
  }
};

window.handleEmailAuth = async function(event) {
  event.preventDefault();
  const email = document.getElementById('emailInput')?.value;
  const password = document.getElementById('passInput')?.value;
  
  if (!email || !password) {
    if (typeof showToast === 'function') {
      showToast('Введите email и пароль');
    }
    return;
  }
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    closeLoginModal();
    if (typeof showToast === 'function') {
      showToast('Вход выполнен');
    }
  } catch (error) {
    console.error('Email login error:', error);
    if (typeof showToast === 'function') {
      showToast(error.message);
    }
  }
};

window.handleRegister = async function(event) {
  event.preventDefault();
  const email = document.getElementById('emailInput')?.value;
  const password = document.getElementById('passInput')?.value;
  
  if (!email || !password) {
    if (typeof showToast === 'function') {
      showToast('Введите email и пароль');
    }
    return;
  }
  
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    closeLoginModal();
    if (typeof showToast === 'function') {
      showToast('Аккаунт создан!');
    }
  } catch (error) {
    console.error('Registration error:', error);
    if (typeof showToast === 'function') {
      showToast(error.message);
    }
  }
};

window.toggleRegisterMode = function() {
  const submitBtn = document.querySelector('#loginModal button[type="submit"]');
  const toggleBtn = document.querySelector('#loginModal button[onclick="toggleRegisterMode()"]');
  
  if (submitBtn && toggleBtn) {
    if (submitBtn.textContent.includes('Войти') || submitBtn.textContent.includes('Login')) {
      submitBtn.innerHTML = '<span data-translate="register_btn">Зарегистрироваться</span>';
      toggleBtn.innerHTML = '<span data-translate="has_account">Уже есть аккаунт?</span> <span data-translate="login">Войти</span>';
    } else {
      submitBtn.innerHTML = '<span data-translate="login_btn">Войти</span>';
      toggleBtn.innerHTML = '<span data-translate="no_account">Нет аккаунта?</span> <span data-translate="register">Зарегистрироваться</span>';
    }
  }
};

// Функция выхода
window.logout = async function() {
  try {
    await signOut(auth);
    currentUser = null;
    window.currentUser = null;
    isAdmin = false;
    updateAuthUI();
    
    if (typeof showToast === 'function') {
      showToast('Выход выполнен');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Проверка состояния аутентификации
window.isLoggedIn = function() {
  return currentUser !== null;
};

window.getCurrentUser = function() {
  return currentUser;
};

window.isAdminUser = function() {
  return isAdmin;
};

// Инициализация при загрузке
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initAuth,
    openLoginModal,
    closeLoginModal,
    loginGoogle,
    loginTwitter,
    handleEmailAuth,
    handleRegister,
    toggleRegisterMode,
    logout,
    isLoggedIn,
    getCurrentUser,
    isAdminUser
  };
}
