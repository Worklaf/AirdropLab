// ================================
// PRELOAD SYSTEM FOR MAIN PAGE
// ================================
// Sistema de precarga para datos entre páginas
// ================================

window.PreloadSystem = {
  // Estado
  initialized: false,
  preloadQueue: [],
  isPreloading: false,
  
  // Inicialización
  init: function() {
    console.log('Initializing Preload System...');
    
    // Configurar observador de navegación
    this.setupNavigationObserver();
    
    // Iniciar precarga en segundo plano
    this.startBackgroundPreload();
    
    this.initialized = true;
    console.log('Preload System initialized');
  },
  
  // Configurar observador de navegación
  setupNavigationObserver: function() {
    // Observar clicks en enlaces internos
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && this.isInternalLink(link.href)) {
        const targetPage = this.getPageType(link.href);
        if (targetPage) {
          this.preloadPageData(targetPage);
        }
      }
    });
  },
  
  // Verificar si es un enlace interno
  isInternalLink: function(href) {
    try {
      const url = new URL(href);
      return url.hostname === window.location.hostname;
    } catch {
      return false;
    }
  },
  
  // Obtener tipo de página desde URL
  getPageType: function(href) {
    const url = new URL(href);
    const path = url.pathname.toLowerCase();
    
    if (path.includes('faucet') || path.includes('kran')) return 'faucet';
    if (path.includes('wheel')) return 'wheel';
    if (path.includes('index') || path === '/') return 'index';
    
    return null;
  },
  
  // Precargar datos para página específica
  preloadPageData: async function(pageType) {
    console.log(`Preloading data for ${pageType} page...`);
    
    switch (pageType) {
      case 'faucet':
        await this.preloadFaucetData();
        break;
      case 'wheel':
        await this.preloadWheelData();
        break;
      case 'index':
        await this.preloadIndexData();
        break;
    }
  },
  
  // Precargar datos para faucets
  preloadFaucetData: async function() {
    const tasks = [
      () => window.GlobalDataCache.loadFaucetsData(window.currentLang || 'en'),
      () => this.preloadUserFavorites(),
      () => this.preloadReagentsStatus()
    ];
    
    await this.executePreloadTasks(tasks, 'faucet');
  },
  
  // Precargar datos para wheel
  preloadWheelData: async function() {
    const tasks = [
      () => this.preloadUserProfile(),
      () => this.preloadWheelStats(),
      () => this.preloadJackpotData()
    ];
    
    await this.executePreloadTasks(tasks, 'wheel');
  },
  
  // Precargar datos para index
  preloadIndexData: async function() {
    const tasks = [
      () => this.preloadUserProfile(),
      () => this.preloadNotifications(),
      () => this.preloadProjects()
    ];
    
    await this.executePreloadTasks(tasks, 'index');
  },
  
  // Precargar perfil de usuario
  preloadUserProfile: async function() {
    if (window.GlobalDataCache.isDataFresh('userProfile', 60000)) { // 1 minuto
      return window.GlobalDataCache.getCachedData('userProfile');
    }
    
    return window.GlobalDataCache.loadUserProfile(window.currentUser?.uid);
  },
  
  // Precargar favoritos
  preloadUserFavorites: async function() {
    if (window.GlobalDataCache.isDataFresh('favorites', 60000)) {
      return window.GlobalDataCache.getCachedData('favorites');
    }
    
    return window.GlobalDataCache.loadUserFavorites(window.currentUser?.uid);
  },
  
  // Precargar estado de reagents
  preloadReagentsStatus: async function() {
    if (window.GlobalDataCache.isDataFresh('reagentsStatus', 30000)) { // 30 segundos
      return window.GlobalDataCache.getCachedData('reagentsStatus');
    }
    
    return window.GlobalDataCache.loadReagentsStatus(window.currentUser?.uid);
  },
  
  // Precargar estadísticas de wheel
  preloadWheelStats: async function() {
    try {
      if (window.db && window.collection && window.getDocs) {
        const statsQuery = window.query(
          window.collection(window.db, 'wheel_spins'),
          window.where('uid', '==', window.currentUser?.uid),
          window.orderBy('ts', 'desc'),
          window.limit(10)
        );
        
        const statsSnapshot = await window.getDocs(statsQuery);
        const stats = statsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Guardar en caché
        window.GlobalDataCache.cache.wheelStats = stats;
        window.GlobalDataCache.cache.lastUpdated.wheelStats = Date.now();
        
        return stats;
      }
    } catch (error) {
      console.error('Error preloading wheel stats:', error);
    }
  },
  
  // Precargar datos de jackpot
  preloadJackpotData: async function() {
    try {
      if (window.db && window.doc && window.getDoc) {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        
        const jackpotDoc = await window.getDoc(window.doc(window.db, 'wheel_jackpot', month));
        if (jackpotDoc.exists()) {
          window.GlobalDataCache.cache.jackpot = jackpotDoc.data();
          window.GlobalDataCache.cache.lastUpdated.jackpot = Date.now();
          
          return jackpotDoc.data();
        }
      }
    } catch (error) {
      console.error('Error preloading jackpot data:', error);
    }
  },
  
  // Precargar notificaciones
  preloadNotifications: async function() {
    if (window.GlobalDataCache.isDataFresh('notifications', 30000)) {
      return window.GlobalDataCache.getCachedData('notifications');
    }
    
    return window.GlobalDataCache.loadUserNotifications(window.currentUser?.uid);
  },
  
  // Precargar proyectos
  preloadProjects: async function() {
    if (window.GlobalDataCache.isDataFresh('projects', 300000)) { // 5 minutos
      return window.GlobalDataCache.getCachedData('projects');
    }
    
    try {
      if (window.db && window.collection && window.getDocs) {
        const projectsSnapshot = await window.getDocs(window.collection(window.db, 'projects'));
        const projects = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        window.GlobalDataCache.cache.projects = projects;
        window.GlobalDataCache.cache.lastUpdated.projects = Date.now();
        
        return projects;
      }
    } catch (error) {
      console.error('Error preloading projects:', error);
    }
  },
  
  // Ejecutar tareas de precarga
  executePreloadTasks: async function(tasks, pageType) {
    const startTime = Date.now();
    
    try {
      const results = await Promise.allSettled(tasks.map(task => task()));
      
      const endTime = Date.now();
      console.log(`Preload completed for ${pageType} in ${endTime - startTime}ms:`, 
        results.map(r => r.status === 'fulfilled'));
        
    } catch (error) {
      console.error(`Error in preload for ${pageType}:`, error);
    }
  },
  
  // Iniciar precarga en segundo plano
  startBackgroundPreload: function() {
    // Precargar datos comunes después de 2 segundos
    setTimeout(() => {
      if (window.currentUser) {
        this.preloadCommonData();
      }
    }, 2000);
    
    // Precargar periódicamente
    setInterval(() => {
      if (window.currentUser && !document.hidden) {
        this.refreshStaleData();
      }
    }, 60000); // Cada minuto
  },
  
  // Precargar datos comunes
  preloadCommonData: async function() {
    const tasks = [
      () => window.GlobalDataCache.loadFaucetsData(window.currentLang || 'en'),
      () => window.GlobalDataCache.loadUserProfile(window.currentUser?.uid),
      () => window.GlobalDataCache.loadUserFavorites(window.currentUser?.uid)
    ];
    
    await this.executePreloadTasks(tasks, 'common');
  },
  
  // Refrescar datos obsoletos
  refreshStaleData: async function() {
    const staleTypes = [];
    
    // Verificar qué datos están obsoletos
    Object.keys(window.GlobalDataCache.cache.lastUpdated).forEach(type => {
      if (type !== 'lastUpdated' && !window.GlobalDataCache.isDataFresh(type, 300000)) { // 5 minutos
        staleTypes.push(type);
      }
    });
    
    if (staleTypes.length > 0) {
      console.log('Refreshing stale data:', staleTypes);
      await window.GlobalDataCache.forceRefresh(staleTypes);
    }
  },
  
  // Obtener estado de precarga
  getPreloadStatus: function() {
    return {
      initialized: this.initialized,
      cacheStatus: Object.keys(window.GlobalDataCache.cache.lastUpdated).map(type => ({
        type,
        lastUpdated: window.GlobalDataCache.cache.lastUpdated[type],
        isFresh: window.GlobalDataCache.isDataFresh(type)
      })),
      currentUser: window.currentUser?.uid || null
    };
  }
};

// Función global para acceso fácil
window.preloadPage = function(pageType) {
  return window.PreloadSystem.preloadPageData(pageType);
};

// Auto-inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.PreloadSystem.init();
  });
} else {
  window.PreloadSystem.init();
}

console.log('Preload System script loaded');
