// ═══════════════════════════════════════════════════════
// 📦 CENTRALIZED AUTHENTICATION SYSTEM
// ═════════════════════════════════════════════════════════
// Единая система входа для всех страниц сайта
// Подключается: <script src="auth.js"></script>
// ═══════════════════════════════════════════════════════════════

// Глобальные переменные для аутентификации
let auth = null;
let currentUser = null;
let isAdmin = false;

// Инициализация аутентификации
async function initAuth() {
  console.log('🔐 Initializing centralized auth system...');
  
  // Ждем загрузки Firebase из index.html
  while (!window.auth || !window.firebaseApp) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  try {
    // Используем глобальные переменные Firebase из index.html
    auth = window.auth;
    
    // Проверяем текущего пользователя
    const immediateUser = auth.currentUser;
    if (immediateUser) {
      console.log('🔐 User already logged in:', immediateUser.uid);
      currentUser = immediateUser;
      window.currentUser = immediateUser;
      isAdmin = immediateUser.uid === (window.ADMIN_UID || 'SAkz4mdW9reDaIsvqigCNZhEKJR2');
    }

    // Отслеживаем изменения состояния аутентификации
    window.onAuthStateChanged(auth, async user => {
      currentUser = user;
      window.currentUser = user;
      isAdmin = user && user.uid === (window.ADMIN_UID || 'SAkz4mdW9reDaIsvqigCNZhEKJR2');
      
      console.log('🔐 Auth state changed:', { user: user?.uid, isAdmin });
      
      // Генерируем событие для других скриптов
      document.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user, isAdmin } }));
    });

    console.log('✅ Centralized auth system initialized');
  } catch (error) {
    console.error('🔐 Auth initialization error:', error);
  }
}

// Функции аутентификации
window.loginGoogle = async function() {
  if (!auth) {
    console.error('🔐 Auth not initialized');
    return;
  }
  
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('🔐 Google login successful');
  } catch (error) {
    console.error('🔐 Google login error:', error);
  }
};

window.loginTwitter = async function() {
  if (!auth) {
    console.error('🔐 Auth not initialized');
    return;
  }
  
  try {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('🔐 Twitter login successful');
  } catch (error) {
    console.error('🔐 Twitter login error:', error);
  }
};

window.logout = async function() {
  if (!auth) {
    console.error('🔐 Auth not initialized');
    return;
  }
  
  try {
    await signOut(auth);
    console.log('🔐 Logout successful');
  } catch (error) {
    console.error('🔐 Logout error:', error);
  }
};

window.isLoggedIn = function() {
  return !!currentUser;
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
