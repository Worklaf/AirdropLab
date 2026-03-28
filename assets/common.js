// ═══════════════════════════════════════════════════════════
// COMMON FUNCTIONS - Общие функции для всех страниц
// ═══════════════════════════════════════════════════════════

// Импортируем Firebase функции (если еще не импортированы)
if (typeof window.collection === 'undefined') {
  // Firebase функции будут доступны после инициализации в основном файле
  console.log('🔧 Waiting for Firebase initialization...');
}

// Глобальные переменные для Firebase (будут установлены в основном файле)
let collection, query, where, orderBy, limit, doc, getDoc, getDocs, addDoc, updateDoc, writeBatch, serverTimestamp, onSnapshot;

// Функция инициализации Firebase экспортов
window.initFirebaseExports = function(firebaseExports) {
  collection = firebaseExports.collection;
  query = firebaseExports.query;
  where = firebaseExports.where;
  orderBy = firebaseExports.orderBy;
  limit = firebaseExports.limit;
  doc = firebaseExports.doc;
  getDoc = firebaseExports.getDoc;
  getDocs = firebaseExports.getDocs;
  addDoc = firebaseExports.addDoc;
  updateDoc = firebaseExports.updateDoc;
  writeBatch = firebaseExports.writeBatch;
  serverTimestamp = firebaseExports.serverTimestamp;
  onSnapshot = firebaseExports.onSnapshot;
  
  console.log('✅ Firebase exports initialized in common.js');
};

// ═══════════════════════════════════════════════════════════
// УВЕДОМЛЕНИЯ
// ═══════════════════════════════════════════════════════════

// Функция форматирования времени
window.formatNotificationDate = function(date) {
  if (!date) return '';
  
  const now = new Date();
  const notifDate = date.toDate ? date.toDate() : new Date(date);
  const diffMs = now - notifDate;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) return 'только что';
  if (diffMins < 60) return diffMins + ' мин. назад';
  if (diffHours < 24) return diffHours + ' ч. назад';
  if (diffDays < 7) return diffDays + ' д. назад';
  
  return notifDate.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short', 
    year: notifDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
  });
};

// Функция обновления бейджа уведомлений
window.updateNotificationBadge = function() {
  const badge = document.getElementById('notificationBadge');
  if (!badge) return;
  
  const unreadCount = (window.allNotifications || []).filter(n => !n.read).length;
  
  if (unreadCount > 0) {
    badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
    badge.textContent = '0';
  }
};

// Функция отображения модального окна уведомлений
window.showNotifications = function() {
  if (!window.currentUser) { 
    if (typeof showToast === 'function') {
      showToast('Войдите'); 
    } else {
      alert('Войдите');
    }
    return; 
  }
  
  // Удаляем существующее модальное окно если есть
  const existingModal = document.getElementById('notificationsModalOverlay');
  if (existingModal) {
    existingModal.remove();
  }
  
  const modal = document.createElement('div');
  modal.id = 'notificationsModalOverlay';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(15,23,42,0.95); z-index: 10000; 
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(10px);
  `;
  
  modal.innerHTML = `
    <div style="background: linear-gradient(145deg, #1e293b, #0f172a); 
                border: 2px solid rgba(34,211,238,0.3); border-radius: 20px; 
                padding: 30px; max-width: 600px; width: 95%; max-height: 80vh; 
                overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="color: #22d3ee; font-size: 24px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-bell"></i> Уведомления
        </h2>
        <button onclick="window.closeNotificationsModal()" 
                style="background: none; border: none; color: #64748b; font-size: 24px; cursor: pointer; padding: 5px;">&times;</button>
      </div>
      
      <!-- Фильтры -->
      <div style="display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;">
        <button class="filter-btn active" data-filter="all" 
                style="background: rgba(34,211,238,0.2); border: 1px solid #22d3ee; color: #22d3ee; 
                       padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">Все</button>
        <button class="filter-btn" data-filter="unread" 
                style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); color: #64748b; 
                       padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">Непрочитанные</button>
        <button class="filter-btn" data-filter="jackpot_win" 
                style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); color: #64748b; 
                       padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">🏆 Джекпот</button>
        <button class="filter-btn" data-filter="spin_result" 
                style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); color: #64748b; 
                       padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">🎰 Крутилка</button>
        <button class="filter-btn" data-filter="system" 
                style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); color: #64748b; 
                       padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">📢 Система</button>
      </div>
      
      <!-- Список уведомлений -->
      <div id="notificationsList" style="max-height: 400px; overflow-y: auto;">
        <div style="text-align: center; color: #64748b; padding: 40px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 10px;"></i>
          <div>Загрузка уведомлений...</div>
        </div>
      </div>
      
      <!-- Кнопка действий -->
      <div style="margin-top: 20px; text-align: center;">
        <button onclick="window.markAllNotificationsAsRead()" 
                style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); 
                       color: #22d3ee; padding: 8px 16px; border-radius: 6px; font-size: 12px; cursor: pointer;">
          Отметить все как прочитанные
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Добавляем обработчики для фильтров
  modal.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      modal.querySelectorAll('.filter-btn').forEach(b => {
        b.style.background = 'rgba(34,211,238,0.1)';
        b.style.borderColor = 'rgba(34,211,238,0.3)';
        b.style.color = '#64748b';
      });
      this.style.background = 'rgba(34,211,238,0.2)';
      this.style.borderColor = '#22d3ee';
      this.style.color = '#22d3ee';
      
      window.filterNotifications(this.dataset.filter);
    });
  });
  
  // Закрытие по клику на фон
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      window.closeNotificationsModal();
    }
  });
  
  // Закрытие по ESC
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      window.closeNotificationsModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
  
  // Загружаем уведомления
  window.loadNotifications();
};

// Функция закрытия модального окна уведомлений
window.closeNotificationsModal = function() {
  const modal = document.getElementById('notificationsModalOverlay');
  if (modal) {
    modal.remove();
  }
};

// Функция загрузки уведомлений
window.loadNotifications = async function() {
  if (!window.db || !window.currentUser) return;
  
  try {
    const notificationsCol = collection(window.db, 'notifications');
    const q = query(notificationsCol, 
                   where('userId', '==', window.currentUser.uid),
                   orderBy('createdAt', 'desc'),
                   limit(50));
    
    const querySnapshot = await getDocs(q);
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    window.allNotifications = notifications;
    window.renderNotificationsInWheel(notifications);
    window.updateNotificationBadge();
    
  } catch (error) {
    console.error('Error loading notifications:', error);
    const listEl = document.getElementById('notificationsList');
    if (listEl) {
      listEl.innerHTML = `
        <div style="text-align: center; color: #ef4444; padding: 40px;">
          <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 10px;"></i>
          <div>Ошибка загрузки уведомлений</div>
        </div>
      `;
    }
  }
};

// Функция рендеринга уведомлений
window.renderNotificationsInWheel = function(notifications) {
  const listEl = document.getElementById('notificationsList');
  if (!listEl) return;

  if (notifications.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; color: #64748b; padding: 40px;">
        <i class="fas fa-bell-slash" style="font-size: 24px; margin-bottom: 10px;"></i>
        <div>У вас пока нет уведомлений</div>
      </div>
    `;
    return;
  }

  listEl.innerHTML = notifications.map(notif => {
    const isUnread = !notif.read;
    let typeIcon = '📢';
    let typeLabel = 'Уведомление';
    
    if (notif.type === 'jackpot_win') {
      typeIcon = '🏆';
      typeLabel = 'Джекпот';
    } else if (notif.type === 'spin_result') {
      typeIcon = '🎰';
      typeLabel = 'Крутилка';
    } else if (notif.type === 'system') {
      typeIcon = '📢';
      typeLabel = 'Система';
    } else if (notif.type === 'newsletter') {
      typeIcon = '📧';
      typeLabel = 'Рассылка';
    } else if (!notif.type) {
      typeIcon = '📢';
      typeLabel = 'Уведомление';
    } else {
      typeIcon = '📢';
      typeLabel = notif.type.charAt(0).toUpperCase() + notif.type.slice(1);
    }
    
    return `
      <div style="background: rgba(30,37,56,0.6); border: 1px solid ${isUnread ? 'rgba(34,211,238,0.4)' : 'rgba(34,211,238,0.2)'}; 
                border-radius: 12px; padding: 16px; margin-bottom: 12px; 
                ${isUnread ? 'border-left: 3px solid #22d3ee;' : ''} 
                ${notif.type === 'jackpot_win' ? 'cursor: pointer; transition: all 0.3s;' : ''}" 
                data-notif-id="${notif.id}" 
                ${notif.type === 'jackpot_win' ? `onclick="window.showJackpotWinnerFromNotification({id: '${notif.id}', userId: '${notif.userId || ''}', winnerName: '${notif.winnerName || ''}', amount: '${notif.amount || '0'}', message: '${notif.message || ''}'})"` : ''}>
        
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <h4 style="color: ${notif.type === 'jackpot_win' ? '#22c55e' : '#22d3ee'}; font-size: 14px; font-weight: 600; margin: 0;">
            ${typeIcon} ${typeLabel}
            ${notif.type === 'jackpot_win' ? '<span style="margin-left: 8px; font-size: 12px; color: #22c55e;">🎉 Нажмите для подробностей</span>' : ''}
          </h4>
          ${isUnread ? '<span style="background: #22d3ee; color: #0f172a; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">NEW</span>' : ''}
        </div>
        
        <p style="color: #f1f5f9; font-size: 13px; line-height: 1.4; margin: 0 0 8px 0;">${notif.message}</p>
        <p style="color: #64748b; font-size: 11px; margin: 0;">${window.formatNotificationDate(notif.createdAt)}</p>
        
        ${isUnread && notif.type !== 'jackpot_win' ? 
          `<button onclick="event.stopPropagation(); window.markNotificationAsReadWheel('${notif.id}')" 
                   style="background: rgba(34,211,238,0.2); border: 1px solid #22d3ee; color: #22d3ee; 
                          cursor: pointer; font-size: 11px; padding: 4px 8px; border-radius: 4px; margin-top: 8px;">
            Отметить как прочитанное
          </button>` : ''}
      </div>
    `;
  }).join('');
  
  window.updateNotificationBadge();
};

// Функция фильтрации уведомлений
window.filterNotifications = function(filterType) {
  if (!window.allNotifications) return;
  
  let filtered = window.allNotifications;
  
  if (filterType === 'unread') {
    filtered = window.allNotifications.filter(n => !n.read);
  } else if (filterType === 'jackpot_win') {
    filtered = window.allNotifications.filter(n => n.type === 'jackpot_win');
  } else if (filterType === 'spin_result') {
    filtered = window.allNotifications.filter(n => n.type === 'spin_result');
  } else if (filterType === 'system') {
    filtered = window.allNotifications.filter(n => n.type === 'system');
  }
  
  window.renderNotificationsInWheel(filtered);
};

// Функция отметки уведомления как прочитанного
window.markNotificationAsReadWheel = async function(notificationId) {
  if (!window.db) return;
  
  try {
    await updateDoc(doc(window.db, 'notifications', notificationId), {
      read: true,
      readAt: serverTimestamp()
    });
    
    if (window.allNotifications) {
      const notif = window.allNotifications.find(n => n.id === notificationId);
      if (notif) notif.read = true;
    }
    
    window.updateNotificationBadge();
    
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    window.filterNotifications(activeFilter);
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

// Функция отметки всех уведомлений как прочитанных
window.markAllNotificationsAsRead = async function() {
  if (!window.db || !window.allNotifications) return;
  
  const unreadNotifications = window.allNotifications.filter(n => !n.read);
  
  if (unreadNotifications.length === 0) {
    if (typeof showToast === 'function') {
      showToast('Все уведомления уже прочитаны');
    }
    return;
  }
  
  try {
    const batch = writeBatch(window.db);
    
    unreadNotifications.forEach(notif => {
      batch.update(doc(window.db, 'notifications', notif.id), {
        read: true,
        readAt: serverTimestamp()
      });
    });
    
    await batch.commit();
    
    window.allNotifications.forEach(n => n.read = true);
    window.updateNotificationBadge();
    
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    window.filterNotifications(activeFilter);
    
    if (typeof showToast === 'function') {
      showToast(`Отмечено ${unreadNotifications.length} уведомлений как прочитанные`);
    }
    
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    if (typeof showToast === 'function') {
      showToast('Ошибка при отметке уведомлений');
    }
  }
};

// ═══════════════════════════════════════════════════════════
// МОДАЛЬНОЕ ОКНО ДЖЕКПОТА
// ═══════════════════════════════════════════════════════════

// Функция для отображения модального окна выигрыша джекпота из уведомлений
window.showJackpotWinnerFromNotification = async function(notification) {
  try {
    // Сначала закрываем модальное окно уведомлений
    const notificationsModal = document.getElementById('notificationsModalOverlay');
    if (notificationsModal) {
      notificationsModal.remove();
    }
    
    // Получаем данные пользователя
    let winnerName = notification.winnerName || 'Пользователь';
    let winnerAvatar = '';
    
    if (notification.userId) {
      try {
        const userSnap = await getDoc(doc(window.db, 'users', notification.userId));
        if (userSnap.exists()) {
          const userData = userSnap.data();
          winnerName = userData.displayName || userData.email || notification.userId.substring(0, 8) + '...';
          winnerAvatar = userData.photoURL || userData.avatarUrl || '';
          
          console.log('👤 User data loaded:', { winnerName, winnerAvatar: winnerAvatar ? 'exists' : 'none' });
        }
      } catch (userError) {
        console.warn('Error loading user data:', userError);
      }
    }
    
    // Обновляем элементы в существующем оверлее
    const nameElement = document.getElementById('jwName');
    const amountElement = document.getElementById('jwAmount');
    const avatarElement = document.getElementById('jwAvatar');
    
    if (nameElement) nameElement.textContent = winnerName;
    if (amountElement) amountElement.textContent = (notification.amount || '0') + ' RGT';
    
    if (avatarElement) {
      if (winnerAvatar) {
        avatarElement.src = winnerAvatar;
        avatarElement.style.display = 'block';
        avatarElement.onerror = function() {
          this.style.display = 'none';
          console.log('🖼️ Avatar failed to load, hiding');
        };
        console.log('🖼️ Avatar set to:', winnerAvatar);
      } else {
        avatarElement.style.display = 'none';
        console.log('🖼️ No avatar, hiding element');
      }
    }
    
    // Показываем оверлей с высоким z-index
    const overlay = document.getElementById('jackpotWinnerOverlay');
    if (overlay) {
      overlay.style.zIndex = '20000';
      overlay.classList.add('show');
      console.log('🎯 Jackpot overlay shown with z-index:', overlay.style.zIndex);
    }
    
    // Запускаем конфетти
    if (typeof launchConfetti === 'function') {
      setTimeout(() => launchConfetti(80), 300);
    }
    
    // Автоматически помечаем уведомление как прочитанное
    if (notification.id && typeof window.markNotificationAsReadWheel === 'function') {
      window.markNotificationAsReadWheel(notification.id);
    }
    
  } catch (error) {
    console.error('Error showing jackpot winner from notification:', error);
  }
};

// ═══════════════════════════════════════════════════════════
// ИНИЦИАЛИЗАЦИЯ СЛУШАТЕЛЯ УВЕДОМЛЕНИЙ
// ═══════════════════════════════════════════════════════════

// Функция инициализации слушателя уведомлений
window.initNotificationsListener = function(userId) {
  if (!window.db) return;
  
  try {
    const notificationsCol = collection(window.db, 'notifications');
    const q = query(notificationsCol, 
                   where('userId', '==', userId),
                   orderBy('createdAt', 'desc'),
                   limit(50));
    
    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      window.allNotifications = notifications;
      window.updateNotificationBadge();
      
      // Проверяем есть ли непрочитанные уведомления
      const unreadCount = notifications.filter(n => !n.read).length;
      if (unreadCount > 0) {
        console.log(`🔔 У вас ${unreadCount} непрочитанных уведомлений`);
      }
    }, (error) => {
      console.error('Error listening to notifications:', error);
    });
  } catch (error) {
    console.error('Error initializing notifications listener:', error);
    return null;
  }
};

// ═══════════════════════════════════════════════════════════
// ПОЛЬЗОВАТЕЛЬСКИЕ ДАННЫЕ
// ═══════════════════════════════════════════════════════════

// Функция обновления пользовательского интерфейса
window.updateUserUI = function(user) {
  const ava = document.getElementById('userAvatar');
  const name = document.getElementById('userName');
  const mobAva = document.getElementById('mobUserAvatar');
  const mobOut = document.getElementById('mobLoggedOutView');
  const mobInn = document.getElementById('mobLoggedInView');
  
  if (user) {
    if (ava) ava.src = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
    if (name) name.textContent = user.displayName || (user.email ? user.email.split('@')[0] : 'Researcher');
    if (mobAva) mobAva.src = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
    if (mobOut) mobOut.style.display = 'none';
    if (mobInn) mobInn.style.display = 'flex';
  } else {
    if (ava) ava.src = 'https://www.gravatar.com/avatar/?d=mp';
    if (name) name.textContent = 'Guest';
    if (mobAva) mobAva.src = 'https://www.gravatar.com/avatar/?d=mp';
    if (mobOut) mobOut.style.display = 'flex';
    if (mobInn) mobInn.style.display = 'none';
  }
};

// ═══════════════════════════════════════════════════════════
// ВСПЛЫВАЮЩИЕ УВЕДОМЛЕНИЯ (TOASTS)
// ═══════════════════════════════════════════════════════════

// Функция показа toast уведомления
window.showToast = function(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; z-index: 30000;
    padding: 12px 20px; border-radius: 8px; color: white;
    font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transform: translateX(100%); transition: transform 0.3s ease;
    max-width: 300px; word-wrap: break-word;
  `;
  
  // Цвета в зависимости от типа
  const colors = {
    success: 'linear-gradient(135deg, #22c55e, #16a34a)',
    error: 'linear-gradient(135deg, #ef4444, #dc2626)',
    warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
    info: 'linear-gradient(135deg, #22d3ee, #06b6d4)'
  };
  
  toast.style.background = colors[type] || colors.info;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Анимация появления
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Автоматическое скрытие
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
};

// ═══════════════════════════════════════════════════════════
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ═══════════════════════════════════════════════════════════

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Инициализируем слушатель уведомлений если пользователь уже авторизован
  if (window.currentUser && window.db) {
    window.initNotificationsListener(window.currentUser.uid);
  }
});

console.log('🔧 Common functions loaded successfully!');
