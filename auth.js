// ============================================================
// AUTH.JS - Централизованная система авторизации
// ============================================================

// Глобальные переменные
if (typeof window.currentUser === 'undefined') {
    window.currentUser = null;
}
if (typeof window.isAdmin === 'undefined') {
    window.isAdmin = false;
}
if (typeof window.auth === 'undefined') {
    window.auth = null;
}
if (typeof window.db === 'undefined') {
    window.db = null;
}

// ============================================================
// ИНИЦИАЛИЗАЦИЯ FIREBASE (Compat версия)
// ============================================================

function initAuth() {
    console.log('🔐 Initializing centralized auth system...');
    
    try {
        // Проверяем, загружен ли Firebase SDK
        if (typeof firebase === 'undefined') {
            console.error('🔥 Firebase SDK not loaded!');
            return;
        }

        // Проверяем конфигурацию
        const config = window.firebaseConfig;
        if (!config) {
            console.error('🔥 Firebase config not found!');
            return;
        }

        // Инициализируем приложение (если еще не инициализировано)
        if (!firebase.apps || !firebase.apps.length) {
            firebase.initializeApp(config);
            console.log('✅ Firebase app initialized');
        }

        // Получаем экземпляры auth и firestore
        window.auth = firebase.auth();
        window.db = firebase.firestore();

        // Настройка Firestore
        if (window.db && window.db.settings) {
            window.db.settings({ merge: true });
        }

        console.log('✅ Firebase initialized successfully');

// Инициализация мобильного наблюдателя и слушателя, чтобы Header узнал о входе
setTimeout(function() {
    if (typeof window.syncAuth === 'function') {
        window.syncAuth();
    }
    if (typeof window.updateMobileAdminButtons === 'function') {
        window.updateMobileAdminButtons();
    }
}, 500);

        // Отслеживаем состояние авторизации
        window.auth.onAuthStateChanged(function(user) {
            window.currentUser = user;
            
            if (user) {
                window.isAdmin = user.uid === (window.ADMIN_UID || 'SAkz4mdW9reDaIsvqigCNZhEKJR2');
                localStorage.setItem('firebaseUser', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }));
                console.log('✅ User logged in:', user.email);

// Сообщаем хедеру, что пользователь вошел
if (typeof window.syncAuth === 'function') {
    window.syncAuth();
}
if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
}
if (typeof window.updateUserUI === 'function') {
    window.updateUserUI(user);
}
            } else {
                window.isAdmin = false;
                localStorage.removeItem('firebaseUser');
                console.log('🔐 User logged out');
            }

            // Обновляем UI
            if (typeof window.updateAuthUI === 'function') {
                window.updateAuthUI();
            }

            // Генерируем событие
            document.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: user } }));
        });

        console.log('✅ Centralized auth system initialized');

    } catch (error) {
        console.error('🔥 Auth initialization error:', error);
    }
}

// ============================================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С МОДАЛЬНЫМ ОКНОМ
// ============================================================

window.openLoginModal = function() {
    console.log('🔐 Opening login modal...');
    
    // Проверяем, существует ли модалка
    let modal = document.getElementById('loginModal');
    
    // Если модалки нет, создаем её
    if (!modal) {
        if (typeof window.createLoginModal === 'function') {
            window.createLoginModal();
            // Даем время на создание
            setTimeout(function() {
                const newModal = document.getElementById('loginModal');
                if (newModal) {
                    // ВАЖНО: Исправляем CSS для отображения
                    newModal.style.display = 'flex';
                    newModal.style.zIndex = '10000';
                    newModal.style.position = 'fixed';
                    newModal.style.top = '0';
                    newModal.style.left = '0';
                    newModal.style.width = '100%';
                    newModal.style.height = '100%';
                    newModal.classList.add('active');
                }
            }, 100);
            return;
        }
        console.error('🔐 Login modal element not found!');
        return;
    }
    
    // Открываем модалку с исправлением CSS
    modal.style.display = 'flex';
    modal.style.zIndex = '10000';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.classList.add('active');
};

window.closeLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
};

// ============================================================
// ФУНКЦИИ ВХОДА (Compat версия)
// ============================================================

window.loginGoogle = function() {
    if (!window.auth) {
        console.error('Auth not initialized');
        alert('Ошибка авторизации. Попробуйте обновить страницу.');
        return;
    }
    
    const provider = new firebase.auth.GoogleAuthProvider();
    window.auth.signInWithPopup(provider)
        .then(function(result) {
            console.log('✅ Google login successful');
            window.closeLoginModal();
            if (typeof showToast === 'function') {
                showToast('Вход через Google выполнен');
            }
        })
        .catch(function(error) {
            console.error('Google login error:', error);
            if (typeof showToast === 'function') {
                showToast('Ошибка: ' + error.message);
            } else {
                alert('Ошибка входа: ' + error.message);
            }
        });
};

window.loginTwitter = function() {
    if (!window.auth) {
        console.error('Auth not initialized');
        alert('Ошибка авторизации. Попробуйте обновить страницу.');
        return;
    }
    
    const provider = new firebase.auth.TwitterAuthProvider();
    window.auth.signInWithPopup(provider)
        .then(function(result) {
            console.log('✅ Twitter login successful');
            window.closeLoginModal();
            if (typeof showToast === 'function') {
                showToast('Вход через Twitter выполнен');
            }
        })
        .catch(function(error) {
            console.error('Twitter login error:', error);
            if (typeof showToast === 'function') {
                showToast('Ошибка: ' + error.message);
            } else {
                alert('Ошибка входа: ' + error.message);
            }
        });
};

window.handleEmailAuth = function(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById('emailInput')?.value;
    const password = document.getElementById('passInput')?.value;
    
    if (!email || !password) {
        if (typeof showToast === 'function') {
            showToast('Введите email и пароль');
        }
        return;
    }
    
    if (!window.auth) {
        console.error('Auth not initialized');
        alert('Ошибка авторизации. Попробуйте обновить страницу.');
        return;
    }
    
    window.auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            console.log('✅ Email login successful');
            window.closeLoginModal();
            if (typeof showToast === 'function') {
                showToast('Вход выполнен');
            }
        })
        .catch(function(error) {
            console.error('Email login error:', error);
            if (typeof showToast === 'function') {
                showToast('Ошибка: ' + error.message);
            } else {
                alert('Ошибка входа: ' + error.message);
            }
        });
};

window.handleRegister = function() {
    const email = document.getElementById('emailInput')?.value;
    const password = document.getElementById('passInput')?.value;
    
    if (!email || !password) {
        if (typeof showToast === 'function') {
            showToast('Введите email и пароль');
        }
        return;
    }
    
    if (!window.auth) {
        console.error('Auth not initialized');
        alert('Ошибка авторизации. Попробуйте обновить страницу.');
        return;
    }
    
    window.auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            console.log('✅ Registration successful');
            window.closeLoginModal();
            if (typeof showToast === 'function') {
                showToast('Аккаунт создан!');
            }
        })
        .catch(function(error) {
            console.error('Registration error:', error);
            if (typeof showToast === 'function') {
                showToast('Ошибка: ' + error.message);
            } else {
                alert('Ошибка регистрации: ' + error.message);
            }
        });
};

window.toggleRegisterMode = function() {
    const submitBtn = document.querySelector('#loginModal button[type="submit"]');
    const toggleBtn = document.querySelector('#loginModal button[onclick*="toggleRegisterMode"]');
    
    if (submitBtn && toggleBtn) {
        if (submitBtn.textContent.includes('Войти')) {
            submitBtn.textContent = 'Зарегистрироваться';
            toggleBtn.innerHTML = 'Уже есть аккаунт? <span style="color:#22d3ee;">Войти</span>';
        } else {
            submitBtn.textContent = 'Войти';
            toggleBtn.innerHTML = 'Нет аккаунта? <span style="color:#22d3ee;">Зарегистрироваться</span>';
        }
    }
};

// ============================================================
// ВЫХОД
// ============================================================

window.logout = function() {
    if (!window.auth) {
        console.error('Auth not initialized');
        return;
    }
    
    window.auth.signOut()
        .then(function() {
            console.log('✅ Logout successful');
            window.currentUser = null;
            window.isAdmin = false;
            localStorage.removeItem('firebaseUser');
            
            if (typeof window.updateAuthUI === 'function') {
                window.updateAuthUI();
            }
            
            if (typeof showToast === 'function') {
                showToast('Выход выполнен');
            }
        })
        .catch(function(error) {
            console.error('Logout error:', error);
        });
};

// ============================================================
// СОЗДАНИЕ МОДАЛЬНОГО ОКНА
// ============================================================

window.createLoginModal = function() {
    if (document.getElementById('loginModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'loginModal';
    modal.className = 'modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
    `;
    
    modal.innerHTML = `
        <div class="modal-content modal-sm p-6 relative" style="background: #1e2538; border: 1px solid rgba(148,163,184,0.2); border-radius: 16px; max-width: 400px; width: 90%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); max-height: 90vh; overflow-y: auto;">
            <button onclick="window.closeLoginModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white" style="position:absolute; top:16px; right:16px; background:none; border:none; font-size:24px; cursor:pointer;">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="text-2xl font-bold mb-6 text-center text-white">Вход</h2>
            <div class="space-y-3">
                <button onclick="window.loginGoogle()" class="w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-200">
                    <i class="fab fa-google text-red-500"></i> Google
                </button>
                <button onclick="window.loginTwitter()" class="w-full bg-[#1DA1F2] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-3">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <div class="relative py-2">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-700"></div></div>
                    <div class="relative flex justify-center"><span class="bg-[#1e2538] px-2 text-xs text-slate-500">ИЛИ EMAIL</span></div>
                </div>
                <form onsubmit="window.handleEmailAuth(event)" class="space-y-3">
                    <input type="email" id="emailInput" placeholder="Email" required class="w-full bg-[#1e2538] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500">
                    <input type="password" id="passInput" placeholder="Пароль" required class="w-full bg-[#1e2538] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500">
                    <button type="submit" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-cyan-500 hover:to-blue-500">
                        Войти
                    </button>
                </form>
                <div class="text-center">
                    <button onclick="window.toggleRegisterMode()" class="text-cyan-400 hover:text-cyan-300 text-sm">
                        Нет аккаунта? Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    console.log('🎨 Login modal created');
};

// ============================================================
// ОБНОВЛЕНИЕ UI АВТОРИЗАЦИИ
// ============================================================

window.updateAuthUI = function() {
    const isLoggedIn = window.currentUser !== null;
    
    // Десктоп
    const loggedOutView = document.getElementById('loggedOutView');
    const loggedInView = document.getElementById('loggedInView');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const userEmail = document.getElementById('userEmail');
    
    // Мобильные
    const mobLoggedOutView = document.getElementById('mobLoggedOutView');
    const mobLoggedInView = document.getElementById('mobLoggedInView');
    const mobUserAvatar = document.getElementById('mobUserAvatar');
    
    if (loggedOutView) loggedOutView.style.display = isLoggedIn ? 'none' : 'block';
    if (loggedInView) loggedInView.style.display = isLoggedIn ? 'flex' : 'none';
    if (mobLoggedOutView) mobLoggedOutView.style.display = isLoggedIn ? 'none' : 'block';
    if (mobLoggedInView) mobLoggedInView.style.display = isLoggedIn ? 'flex' : 'none';
    
    if (isLoggedIn && window.currentUser) {
        const user = window.currentUser;
        const name = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
        
        if (userName) userName.textContent = name;
        if (userAvatar) userAvatar.src = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
        if (userEmail) userEmail.textContent = user.email || '';
        if (mobUserAvatar) mobUserAvatar.src = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
    }
};

// ============================================================
// ЗАПУСК ИНИЦИАЛИЗАЦИИ
// ============================================================

// Запускаем инициализацию после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Даем время на загрузку Firebase SDK
        setTimeout(initAuth, 100);
    });
} else {
    setTimeout(initAuth, 100);
}

console.log('🔐 Auth system loaded');
