// ═════════════════════════════════════════════════════════
// 🎨 CENTRALIZED LOGIN MODAL
// ═══════════════════════════════════════════════════════════════════

// Функция создания модального окна входа
window.createLoginModal = function() {
  // Проверяем, существует ли уже модальное окно
  if (document.getElementById('loginModal')) {
    return;
  }

  // Создаем модальное окно
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
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    align-items: center;
    justify-content: center;
  `;

  modal.innerHTML = `
    <div class="modal-content modal-sm p-6 relative">
      <button onclick="window.closeLoginModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
        <i class="fas fa-times"></i>
      </button>
      <h2 class="text-2xl font-bold mb-6 text-center" data-translate="login_title">Вход</h2>
      <div class="space-y-3">
        <button onclick="window.loginGoogle()" class="w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-200">
          <i class="fab fa-google text-red-500"></i> 
          <span data-translate="google">Google</span>
        </button>
        <button onclick="window.loginTwitter()" class="w-full bg-[#1DA1F2] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-3">
          <i class="fab fa-twitter"></i> 
          <span data-translate="twitter">Twitter</span>
        </button>
        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-700"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-[#1e2538] px-2 text-xs text-slate-500" data-translate="or_email">ИЛИ EMAIL</span>
          </div>
        </div>
        <form onsubmit="window.handleEmailAuth(event)" class="space-y-3">
          <input type="email" id="emailInput" placeholder="Email" class="w-full bg-[#1e2538] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500" required>
          <input type="password" id="passInput" placeholder="Пароль" class="w-full bg-[#1e2538] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500" required>
          <button type="submit" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-cyan-500 hover:to-blue-500">
            <span data-translate="login_btn">Войти</span>
          </button>
        </form>
        <div class="text-center">
          <button onclick="window.toggleRegisterMode()" class="text-cyan-400 hover:text-cyan-300 text-sm">
            <span data-translate="no_account">Нет аккаунта?</span> <span data-translate="register">Зарегистрироваться</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Добавляем в body
  document.body.appendChild(modal);

  // Делаем функции доступными глобально
  window.openLoginModal = function() {
    console.log('🔐 Opening login modal...');
    modal.style.display = 'flex';
    modal.classList.add('active');
    console.log('🔐 Modal should be visible now');
  };

  window.closeLoginModal = function() {
    modal.style.display = 'none';
    modal.classList.remove('active');
  };

  console.log('🎨 Login modal created and ready');
};

// Функция инициализации модального окна
window.initLoginModal = function() {
  if (document.getElementById('loginModal')) {
    console.log('🎨 Login modal already exists');
    return;
  }
  
  // Добавляем CSS стили если их нет
  if (!document.getElementById('auth-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'auth-modal-styles';
    style.textContent = `
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 10000;
        align-items: center;
        justify-content: center;
      }
      
      .modal.active,
      .modal[style*="flex"] {
        display: flex !important;
      }
      
      .modal-content {
        background: #1e2538;
        border: 1px solid rgba(148,163,184,0.2);
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .modal-sm {
        max-width: 400px;
        width: 90%;
      }
      
      .space-y-3 > * + * {
        margin-top: 0.75rem;
      }
      
      .space-y-4 > * + * {
        margin-top: 1rem;
      }
    `;
    document.head.appendChild(style);
  }

  // Создаем модальное окно
  createLoginModal();
};
