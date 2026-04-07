// ================================
// OFFLINE MANAGER
// ================================
// Sistema de gestión para modo offline y errores de conexión
// ================================

window.OfflineManager = {
  // Estado
  isOnline: navigator.onLine,
  retryAttempts: {},
  maxRetries: 3,
  retryDelay: 2000,
  
  // Inicialización
  init: function() {
    console.log('Initializing Offline Manager...');
    
    // Configurar listeners de conexión
    this.setupConnectionListeners();
    
    // Configurar interceptor de errores Firebase
    this.setupFirebaseErrorInterceptor();
    
    console.log('Offline Manager initialized');
  },
  
  // Configurar listeners de conexión
  setupConnectionListeners: function() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('🟢 Connection restored');
      this.handleConnectionRestored();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('🔴 Connection lost');
      this.handleConnectionLost();
    });
  },
  
  // Manejar restauración de conexión
  handleConnectionRestored: function() {
    // Limpiar intentos de reintento
    this.retryAttempts = {};
    
    // Notificar a otros sistemas
    window.dispatchEvent(new CustomEvent('connectionRestored'));
    
    // Mostrar notificación si está disponible
    if (typeof window.showToast === 'function') {
      window.showToast('Conexión restaurada', 'success');
    }
  },
  
  // Manejar pérdida de conexión
  handleConnectionLost: function() {
    // Notificar a otros sistemas
    window.dispatchEvent(new CustomEvent('connectionLost'));
    
    // Mostrar notificación si está disponible
    if (typeof window.showToast === 'function') {
      window.showToast('Modo offline activado', 'warning');
    }
  },
  
  // Configurar interceptor de errores Firebase
  setupFirebaseErrorInterceptor: function() {
    // Intercept errores de Firebase
    const originalConsoleError = console.error;
    
    console.error = (...args) => {
      const message = args[0];
      
      // Detectar errores específicos de Firebase
      if (typeof message === 'string') {
        if (message.includes('Failed to get document because the client is offline')) {
          this.handleOfflineError('document_get', args);
          return;
        }
        
        if (message.includes('UNAVAILABLE') || message.includes('network error')) {
          this.handleOfflineError('network', args);
          return;
        }
        
        if (message.includes('permission-denied')) {
          this.handlePermissionError(args);
          return;
        }
      }
      
      // Para otros errores, usar el handler original
      originalConsoleError.apply(console, args);
    };
  },
  
  // Manejar errores de offline
  handleOfflineError: function(type, errorArgs) {
    const errorKey = `${type}_${Date.now()}`;
    
    console.warn(`🔴 Offline error detected: ${type}`, errorArgs);
    
    // No reintentar inmediatamente si ya estamos offline
    if (!this.isOnline) {
      console.log('Already offline - suppressing error');
      return;
    }
    
    // Verificar si debemos reintentar
    if (this.shouldRetry(type)) {
      this.scheduleRetry(type, errorKey);
    } else {
      console.warn(`Max retries reached for ${type}`);
      if (typeof window.showToast === 'function') {
        window.showToast('Error de conexión - usando datos cacheados', 'error');
      }
    }
  },
  
  // Manejar errores de permisos
  handlePermissionError: function(errorArgs) {
    console.error('🔒 Permission error:', errorArgs);
    
    if (typeof window.showToast === 'function') {
      window.showToast('Error de permisos - contacte al administrador', 'error');
    }
  },
  
  // Verificar si debemos reintentar
  shouldRetry: function(type) {
    const attempts = this.retryAttempts[type] || 0;
    return attempts < this.maxRetries;
  },
  
  // Programar reintento
  scheduleRetry: function(type, errorKey) {
    const attempts = (this.retryAttempts[type] || 0) + 1;
    this.retryAttempts[type] = attempts;
    
    const delay = this.retryDelay * Math.pow(2, attempts - 1); // Exponential backoff
    
    console.log(`Scheduling retry ${attempts}/${this.maxRetries} for ${type} in ${delay}ms`);
    
    setTimeout(() => {
      if (this.isOnline) {
        console.log(`Retrying ${type}...`);
        this.executeRetry(type);
      } else {
        console.log('Still offline - cancelling retry');
      }
    }, delay);
  },
  
  // Ejecutar reintento
  executeRetry: function(type) {
    switch (type) {
      case 'document_get':
        this.retryDocumentGet();
        break;
      case 'network':
        this.retryNetworkOperation();
        break;
      default:
        console.log(`Unknown retry type: ${type}`);
    }
  },
  
  // Reintentar obtención de documento
  retryDocumentGet: function() {
    // Disparar evento para que otros componentes manejen el reintento
    window.dispatchEvent(new CustomEvent('retryDocumentGet'));
  },
  
  // Reintentar operación de red
  retryNetworkOperation: function() {
    // Disparar evento para sincronización
    if (window.GlobalDataCache && window.GlobalDataCache.syncAllData) {
      window.GlobalDataCache.syncAllData();
    }
  },
  
  // Verificar estado de conexión
  isConnectionAvailable: function() {
    return this.isOnline && navigator.onLine;
  },
  
  // Obtener estado detallado
  getConnectionStatus: function() {
    return {
      online: this.isOnline,
      navigatorOnline: navigator.onLine,
      retryAttempts: { ...this.retryAttempts },
      canRetry: Object.keys(this.retryAttempts).some(type => this.shouldRetry(type))
    };
  },
  
  // Forzar verificación de conexión
  checkConnection: function() {
    const wasOnline = this.isOnline;
    this.isOnline = navigator.onLine;
    
    if (!wasOnline && this.isOnline) {
      this.handleConnectionRestored();
    } else if (wasOnline && !this.isOnline) {
      this.handleConnectionLost();
    }
    
    return this.isOnline;
  },
  
  // Limpiar recursos
  cleanup: function() {
    this.retryAttempts = {};
  }
};

// Funciones globales para acceso fácil
window.isOnline = function() {
  return window.OfflineManager.isConnectionAvailable();
};

window.forceConnectionCheck = function() {
  return window.OfflineManager.checkConnection();
};

// Auto-inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.OfflineManager.init();
  });
} else {
  window.OfflineManager.init();
}

console.log('Offline Manager script loaded');
