// ================================
// GLOBAL DATA CACHE SYSTEM
// ================================
// Sistema de caché global para datos entre páginas
// ================================

window.GlobalDataCache = {
  // Estado del caché
  initialized: false,
  firebaseReady: false,
  currentUser: null,
  
  // Datos cacheados
  cache: {
    userProfile: null,
    faucets: null,
    favorites: [],
    reagentsStatus: null,
    notifications: [],
    projects: [],
    lastUpdated: {}
  },
  
  // Inicialización del sistema
  init: function() {
    console.log('Initializing Global Data Cache...');
    
    // Cargar datos desde localStorage si existen
    this.loadFromStorage();
    
    // Configurar listeners de Firebase
    this.setupFirebaseListeners();
    
    // Configurar sincronización entre páginas
    this.setupCrossPageSync();
    
    this.initialized = true;
    console.log('Global Data Cache initialized');
  },
  
  // Cargar desde localStorage
  loadFromStorage: function() {
    try {
      const cached = localStorage.getItem('airdroplab_global_cache');
      if (cached) {
        const data = JSON.parse(cached);
        this.cache = { ...this.cache, ...data };
        console.log('Loaded cache from localStorage:', Object.keys(this.cache));
      }
    } catch (error) {
      console.warn('Error loading cache from storage:', error);
    }
  },
  
  // Guardar en localStorage
  saveToStorage: function() {
    try {
      localStorage.setItem('airdroplab_global_cache', JSON.stringify(this.cache));
      console.log('Cache saved to localStorage');
    } catch (error) {
      console.warn('Error saving cache to storage:', error);
    }
  },
  
  // Configurar listeners de Firebase
  setupFirebaseListeners: function() {
    // Esperar a que Firebase esté listo
    const checkFirebase = () => {
      if (window.db && window.auth) {
        this.firebaseReady = true;
        console.log('Firebase ready, setting up listeners...');
        
        // Listener de autenticación
        if (window.auth && typeof window.onAuthStateChanged === 'function') {
          window.onAuthStateChanged(window.auth, (user) => {
            this.currentUser = user;
            if (user) {
              this.loadUserData(user);
            } else {
              this.clearUserData();
            }
          });
        }
        
        // Cargar datos iniciales si hay usuario
        if (this.currentUser) {
          this.loadUserData(this.currentUser);
        }
        
      } else {
        setTimeout(checkFirebase, 100);
      }
    };
    
    checkFirebase();
  },
  
  // Cargar datos de usuario
  loadUserData: async function(user) {
    console.log('Loading user data for:', user.uid);
    
    try {
      // Perfil de usuario
      await this.loadUserProfile(user.uid);
      
      // Favoritos
      await this.loadUserFavorites(user.uid);
      
      // Estado de reagents
      await this.loadReagentsStatus(user.uid);
      
      // Notificaciones
      await this.loadUserNotifications(user.uid);
      
      // Guardar caché
      this.saveToStorage();
      
      console.log('User data loaded and cached');
      
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  },
  
  // Cargar perfil de usuario
  loadUserProfile: async function(uid) {
    try {
      if (window.db && window.doc && window.getDoc) {
        const userDoc = await window.getDoc(window.doc(window.db, 'users', uid));
        if (userDoc.exists()) {
          this.cache.userProfile = userDoc.data();
          this.cache.lastUpdated.userProfile = Date.now();
          
          // Disparar evento para otras páginas
          this.dispatchDataUpdate('userProfile', this.cache.userProfile);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  },
  
  // Cargar favoritos
  loadUserFavorites: async function(uid) {
    try {
      if (window.db && window.doc && window.getDoc) {
        const favDoc = await window.getDoc(window.doc(window.db, 'userFavorites', uid));
        if (favDoc.exists()) {
          this.cache.favorites = favDoc.data().favorites || [];
          this.cache.lastUpdated.favorites = Date.now();
          
          this.dispatchDataUpdate('favorites', this.cache.favorites);
        }
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  },
  
  // Cargar estado de reagents
  loadReagentsStatus: async function(uid) {
    try {
      if (window.db && window.doc && window.getDoc) {
        const reagentDoc = await window.getDoc(window.doc(window.db, 'reagents', uid));
        if (reagentDoc.exists()) {
          this.cache.reagentsStatus = reagentDoc.data();
          this.cache.lastUpdated.reagentsStatus = Date.now();
          
          this.dispatchDataUpdate('reagentsStatus', this.cache.reagentsStatus);
        }
      }
    } catch (error) {
      console.error('Error loading reagents status:', error);
    }
  },
  
  // Cargar notificaciones
  loadUserNotifications: async function(uid) {
    try {
      if (window.db && window.collection && window.query && window.where && window.getDocs) {
        const notificationsQuery = window.query(
          window.collection(window.db, 'notifications'),
          window.where('userId', '==', uid),
          window.where('read', '==', false),
          window.limit(50)
        );
        
        const notificationsSnapshot = await window.getDocs(notificationsQuery);
        this.cache.notifications = notificationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.cache.lastUpdated.notifications = Date.now();
        
        this.dispatchDataUpdate('notifications', this.cache.notifications);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  },
  
  // Cargar datos de faucets (globales para todos los usuarios)
  loadFaucetsData: async function(language = 'en') {
    try {
      // Verificar si ya tenemos datos recientes
      const now = Date.now();
      const lastUpdate = this.cache.lastUpdated.faucets || 0;
      
      if (this.cache.faucets && (now - lastUpdate) < 5 * 60 * 1000) { // 5 minutos
        console.log('Using cached faucets data');
        return this.cache.faucets;
      }
      
      if (window.db && window.collection && window.getDocs) {
        const faucetsSnapshot = await window.getDocs(window.collection(window.db, `faucets_${language}`));
        this.cache.faucets = faucetsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.cache.lastUpdated.faucets = now;
        
        this.saveToStorage();
        this.dispatchDataUpdate('faucets', this.cache.faucets);
        
        console.log(`Loaded ${this.cache.faucets.length} faucets`);
        return this.cache.faucets;
      }
    } catch (error) {
      console.error('Error loading faucets data:', error);
      return this.cache.faucets || [];
    }
  },
  
  // Limpiar datos de usuario
  clearUserData: function() {
    this.cache.userProfile = null;
    this.cache.favorites = [];
    this.cache.reagentsStatus = null;
    this.cache.notifications = [];
    this.currentUser = null;
    
    this.saveToStorage();
    this.dispatchDataUpdate('cleared', null);
  },
  
  // Configurar sincronización entre páginas
  setupCrossPageSync: function() {
    // Escuchar eventos de otras páginas
    window.addEventListener('storage', (e) => {
      if (e.key === 'airdroplab_global_cache') {
        console.log('Cache updated from another page');
        this.loadFromStorage();
        this.notifyPageUpdate();
      }
    });
    
    // Escuchar eventos personalizados
    window.addEventListener('globalDataUpdate', (e) => {
      const { type, data } = e.detail;
      this.cache[type] = data;
      this.cache.lastUpdated[type] = Date.now();
      this.saveToStorage();
    });
  },
  
  // Disparar evento de actualización
  dispatchDataUpdate: function(type, data) {
    const event = new CustomEvent('globalDataUpdate', {
      detail: { type, data }
    });
    window.dispatchEvent(event);
    
    // También actualizar localStorage inmediatamente
    this.saveToStorage();
  },
  
  // Notificar a la página actual
  notifyPageUpdate: function() {
    const event = new CustomEvent('cacheUpdated', {
      detail: this.cache
    });
    window.dispatchEvent(event);
  },
  
  // Obtener datos cacheados
  getCachedData: function(type) {
    return this.cache[type] || null;
  },
  
  // Verificar si los datos están frescos
  isDataFresh: function(type, maxAge = 5 * 60 * 1000) { // 5 minutos por defecto
    const lastUpdate = this.cache.lastUpdated[type] || 0;
    return (Date.now() - lastUpdate) < maxAge;
  },
  
  // Forzar recarga de datos
  forceRefresh: async function(types = ['userProfile', 'favorites', 'reagentsStatus', 'notifications']) {
    console.log('Force refreshing data types:', types);
    
    if (this.currentUser) {
      for (const type of types) {
        switch (type) {
          case 'userProfile':
            await this.loadUserProfile(this.currentUser.uid);
            break;
          case 'favorites':
            await this.loadUserFavorites(this.currentUser.uid);
            break;
          case 'reagentsStatus':
            await this.loadReagentsStatus(this.currentUser.uid);
            break;
          case 'notifications':
            await this.loadUserNotifications(this.currentUser.uid);
            break;
        }
      }
    }
  }
};

// Función global para fácil acceso
window.getGlobalData = function(type) {
  return window.GlobalDataCache.getCachedData(type);
};

window.isDataFresh = function(type, maxAge) {
  return window.GlobalDataCache.isDataFresh(type, maxAge);
};

// Auto-inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.GlobalDataCache.init();
  });
} else {
  window.GlobalDataCache.init();
}

console.log('Global Data Cache script loaded');
