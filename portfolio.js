// ============================================================
// PORTFOLIO.JS - Crypto Portfolio Tracker Pro
// Полная бизнес-логика, адаптированная для AirdropLab
// ============================================================

// ============================================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ
// ============================================================

const API_BASE = '/api/coingecko'; // Vercel proxy для CoinGecko
const COINCAP_API = 'https://api.coincap.io/v2';
const BINANCE_API = 'https://api.binance.com/api/v3';
const FEAR_API = 'https://api.alternative.me/fng/?limit=1';

const CACHE_KEY = 'ct_cache_v5';
const PORTFOLIO_KEY = 'ct_portfolio_v5';
const NOTIF_KEY = 'ct_notifs_v5';
const ALERTS_KEY = 'ct_alerts_v5';
const AUTO_ALERTS_KEY = 'ct_auto_alerts_v1';
const ORDERS_KEY = 'ct_orders_v1';
const CACHE_TTL = 60 * 60 * 1000; // 1 час - увеличено из-за проблем с API

let allCoins = [];
let extraCoins = {};
let globalData = null;
let fearData = null;
let portfolio = [];
let notifications = [];
let alertsList = [];
let marketSort = { col: 'market_cap_rank', dir: 'asc' };
let portfolioSort = { col: null, dir: 'desc' };
let expandedRows = {};
let currentTxHoldingId = null;
let currentChartCoin = null;
let searchDebounce = null;
let currentEditTxId = null;
let currentEditOrderId = null;
let portfolioViewMode = 'table';

let marketFilter = '';
let advisorFilter = 'all';
let autoAlertsEnabled = true;
let orders = [];

let portfolioFilter = '';
let orderStatusFilter = 'all';
let collapsedSections = { portfolioAssets: false, ordersSection: false };

// Track recent user actions to prevent repeated recommendations
const recentUserActions = new Map();
const lastSentNotifications = new Map();

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function fmt$(n) {
    if (typeof n !== 'number' || isNaN(n)) return '$0';
    const sign = n < 0 ? '-' : '';
    const a = Math.abs(n);
    if (a >= 1e9) return sign + '$' + (a / 1e9).toFixed(2) + 'B';
    if (a >= 1e6) return sign + '$' + (a / 1e6).toFixed(1) + 'M';
    if (a >= 1000) return sign + '$' + a.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (a >= 1) return sign + '$' + a.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (a >= 0.01) return sign + '$' + a.toFixed(4);
    if (a === 0) return '$0';
    return sign + '$' + a.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
}

function fmtLarge(n) {
    if (typeof n !== 'number' || isNaN(n)) return '$0';
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
    return '$' + n.toLocaleString();
}

function fmtPct(n) {
    if (typeof n !== 'number' || isNaN(n)) return '0.00%';
    return (n > 0 ? '+' : '') + n.toFixed(2) + '%';
}

function getColor(i) {
    const colors = ['#3b82f6', '#ef4444', '#22c55e', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16'];
    return colors[i % colors.length];
}

function findCoin(id) {
    if (!id) return null;
    const byIdOrSymbol = allCoins.find(c => c.id === id || c.symbol.toLowerCase() === id);
    if (byIdOrSymbol) return byIdOrSymbol;
    if (extraCoins[id]) return extraCoins[id];
    return Object.values(extraCoins).find(c => c.symbol.toLowerCase() === id) || null;
}

// ============================================================
// РАБОТА С ХРАНИЛИЩЕМ (Firebase + localStorage)
// ============================================================
 

// Следим за изменениями пользователя
if (window.auth) {
    window.auth.onAuthStateChanged(function(user) {
        currentUser = user;
        window.currentUser = user;
        if (user) {
            loadPortfolio();
            loadNotifs();
            loadAlerts();
            loadOrders();
            loadAutoAlertSettings();
            renderAll();
        } else {
            // Загружаем из localStorage при выходе
            loadPortfolio();
            loadNotifs();
            loadAlerts();
            loadOrders();
            renderAll();
        }
        updateAuthUI();
    });
}

async function loadPortfolio() {
    try {
        if (window.db && window.currentUser) {
            const userId = window.currentUser.uid;
            const docRef = window.db.collection('portfolios').doc(userId);
            const docSnap = await docRef.get();

            if (docSnap.exists) {
                const data = docSnap.data();
                if (data.portfolio) {
                    portfolio = data.portfolio;
                    console.log('Portfolio loaded from Firebase');
                }
            } else {
                const d = localStorage.getItem(PORTFOLIO_KEY);
                if (d) portfolio = JSON.parse(d);
            }
        } else {
            const d = localStorage.getItem(PORTFOLIO_KEY);
            if (d) portfolio = JSON.parse(d);
        }
    } catch (e) {
        console.error('Error loading portfolio:', e);
        try {
            const d = localStorage.getItem(PORTFOLIO_KEY);
            if (d) portfolio = JSON.parse(d);
        } catch {}
    }

    portfolio.forEach(h => {
        if (!h.id) h.id = uid();
        if (!h.purchases || !h.purchases.length) {
            h.purchases = [{ id: uid(), date: new Date().toISOString().split('T')[0], amount: h.amount, price: h.avgPrice, type: 'buy' }];
        } else {
            h.purchases.forEach(p => {
                if (!p.id) p.id = uid();
                if (!p.type) p.type = 'buy';
            });
        }
        recalcRealizedPnl(h);
        recomputeHolding(h);
    });
    savePortfolio();
}

async function savePortfolio() {
    try {
        localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
            clearOldCache();
            try {
                localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
            } catch (e2) {}
        }
    }
    try {
        if (window.db && window.currentUser) {
            const userId = window.currentUser.uid;
            const docRef = window.db.collection('portfolios').doc(userId);
            await docRef.set({ portfolio: portfolio, updatedAt: new Date().toISOString() }, { merge: true });
        }
    } catch (e) {
        console.error('Error saving portfolio to Firebase:', e);
    }
}

async function loadNotifs() {
    try {
        if (window.db && window.currentUser) {
            const userId = window.currentUser.uid;
            const docRef = window.db.collection('portfolios').doc(userId);
            const docSnap = await docRef.get();
            if (docSnap.exists) {
                const data = docSnap.data();
                if (data.notifications) notifications = data.notifications;
            }
        }
    } catch (e) { console.error('Error loading notifications:', e); }
    try { const d = localStorage.getItem(NOTIF_KEY); if (d) notifications = JSON.parse(d); } catch {}
}

async function saveNotifs() {
    if (notifications.length > 100) notifications = notifications.slice(-100);
    try {
        localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
            clearOldCache();
            try {
                localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
            } catch (e2) {}
        }
    }
    try {
        if (window.db && window.currentUser) {
            const userId = window.currentUser.uid;
            const docRef = window.db.collection('portfolios').doc(userId);
            await docRef.set({ notifications: notifications }, { merge: true });
        }
    } catch (e) {
        console.error('Error saving notifications:', e);
    }
}

async function loadAlerts() {
    try {
        if (window.db && window.currentUser) {
            const userId = window.currentUser.uid;
            const docRef = window.db.collection('portfolios').doc(userId);
            const docSnap = await docRef.get();
            if (docSnap.exists) {
                const data = docSnap.data();
                if (data.alerts) alertsList = data.alerts;
            }
        }
    } catch (e) { console.error('Error loading alerts:', e); }
    try { const d = localStorage.getItem(ALERTS_KEY); if (d) alertsList = JSON.parse(d); } catch {}
}

async function saveAlerts() {
    try {
        localStorage.setItem(ALERTS_KEY, JSON.stringify(alertsList));
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
            clearOldCache();
            try {
                localStorage.setItem(ALERTS_KEY, JSON.stringify(alertsList));
            } catch (e2) {}
        }
    }
    try {
        if (window.db && window.currentUser) {
            const userId = window.currentUser.uid;
            const docRef = window.db.collection('portfolios').doc(userId);
            await docRef.set({ alerts: alertsList }, { merge: true });
        }
    } catch (e) {
        console.error('Error saving alerts:', e);
    }
}

async function loadOrders() {
    // Всегда загружаем из Firebase если пользователь авторизован
    if (window.db && window.currentUser) {
        try {
            const userId = window.currentUser.uid;
            const docRef = window.db.collection('portfolios').doc(userId);
            const docSnap = await docRef.get();
            if (docSnap.exists) {
                const data = docSnap.data();
                if (data.orders) {
                    orders = data.orders;
                    console.log('Orders loaded from Firebase:', orders.length);
                    return;
                }
            }
            console.log('No orders found in Firebase for user');
        } catch (e) { console.error('Error loading orders from Firebase:', e); }
    }
    
    // Fallback: загружаем из localStorage только если не авторизован или Firebase не сработал
    try {
        const d = localStorage.getItem(ORDERS_KEY);
        if (d) {
            orders = JSON.parse(d);
            orders.forEach(o => { if (!o.status) o.status = 'active'; });
            console.log('Orders loaded from localStorage:', orders.length);
        }
    } catch (e) { console.error('Error loading orders from localStorage:', e); }
}

async function saveOrders() {
    // Сохраняем в localStorage для быстрого доступа
    try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
            console.error('localStorage quota exceeded for orders');
        }
    }
    
    // Сохраняем в Firebase для синхронизации между устройствами
    if (window.db && window.currentUser) {
        try {
            const userId = window.currentUser.uid;
            const docRef = window.db.collection('portfolios').doc(userId);
            await docRef.set({ orders: orders }, { merge: true });
        } catch (e) {
            console.error('Error saving orders to Firebase:', e);
        }
    }
}

function loadAutoAlertSettings() {
    try {
        const v = localStorage.getItem(AUTO_ALERTS_KEY);
        if (v !== null) autoAlertsEnabled = JSON.parse(v);
    } catch {}
}

function saveAutoAlertSettings() {
    localStorage.setItem(AUTO_ALERTS_KEY, JSON.stringify(autoAlertsEnabled));
}

function clearOldCache() {
    try {
        localStorage.removeItem('ct_extra_coins');
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem('ct_cache_v4');
        localStorage.removeItem('ct_portfolio_v4');
    } catch (e) {}
}

function getCache() {
    try {
        const cache = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (!cache) return null;
        return cache;
    } catch { return null; }
}

// ============================================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С COINGECKO
// ============================================================

async function apiFetch(url, attempts) {
    attempts = attempts || 0;

    try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(url, {
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            headers: { 'Accept': 'application/json' },
            signal: ctrl.signal
        });
        clearTimeout(t);
        if (res.ok) return res;
    } catch (e) {
        console.log('Direct fetch failed, trying proxy:', e.message);
    }

    const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest=',
        'https://thingproxy.freeboard.io/fetch/'
    ];

    let lastErr;
    for (let p of proxies) {
        try {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 12000);
            const proxyUrl = p + encodeURIComponent(url);
            const res = await fetch(proxyUrl, { signal: ctrl.signal });
            clearTimeout(t);
            if (res.ok) return res;

            if (res.status === 429) {
                lastErr = new Error('rate limit');
                if (attempts < 2) {
                    await new Promise(r => setTimeout(r, 2000));
                    continue;
                }
            }

            if (res.status === 403 || res.status === 503) {
                lastErr = new Error('proxy blocked');
                continue;
            }

            return res;
        } catch (e) {
            lastErr = e;
        }
    }

    throw lastErr || new Error('fetch failed');
}

async function fetchAll() {
    try {
        const cache = getCache();
        if (cache && cache.coins && cache.coins.length) {
            allCoins = cache.coins;
            if (cache.global) globalData = cache.global;
            if (cache.fear) fearData = cache.fear;
            if (cache.portfolioCoins) {
                Object.assign(extraCoins, cache.portfolioCoins);
            }
            syncAutoAlertsFromAdvisor();
            renderAll();
            checkNotifs();
        }

        if (cache && Date.now() - cache.time < CACHE_TTL) {
            await refreshExtraCoins();
            syncAutoAlertsFromAdvisor();
            hideCorsWarning();
            const cacheAge = Math.floor((Date.now() - cache.time) / 60000); // минуты
            document.getElementById('lastUpdate').textContent = `кэш (${cacheAge} мин назад)`;
            return;
        }

        // Загружаем данные через Vercel proxy
        try {
            const page1 = await fetch(`${API_BASE}?path=coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h,7d,30d`);
            if (!page1.ok) throw new Error('coins page 1 status ' + page1.status);
            const data1 = await page1.json();
            allCoins = data1;

            try {
                const page2 = await fetch(`${API_BASE}?path=coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=true&price_change_percentage=24h,7d,30d`);
                if (page2.ok) {
                    const data2 = await page2.json();
                    allCoins = [...data1, ...data2];
                }
            } catch (e2) { console.log('page 2 failed', e2); }
        } catch (e) {
            console.log('Vercel proxy failed, using cache:', e);
            if (cache && cache.coins) {
                allCoins = cache.coins;
                document.getElementById('lastUpdate').textContent = 'Ошибка API, использован кэш';
            } else {
                // Если кэша нет совсем - создаем дефолтный
                const defaultCoins = [
                    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 60000, price_change_percentage_24h: 2.5, market_cap: 1200000000000, total_volume: 30000000000, market_cap_rank: 1, image: 'https://assets.coincap.io/assets/icons/btc@2x.png', sparkline_in_7d: null },
                    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3500, price_change_percentage_24h: 3.2, market_cap: 420000000000, total_volume: 15000000000, market_cap_rank: 2, image: 'https://assets.coincap.io/assets/icons/eth@2x.png', sparkline_in_7d: null },
                    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', current_price: 600, price_change_percentage_24h: 1.8, market_cap: 90000000000, total_volume: 1000000000, market_cap_rank: 3, image: 'https://assets.coincap.io/assets/icons/bnb@2x.png', sparkline_in_7d: null },
                    { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 150, price_change_percentage_24h: 4.5, market_cap: 65000000000, total_volume: 2000000000, market_cap_rank: 4, image: 'https://assets.coincap.io/assets/icons/sol@2x.png', sparkline_in_7d: null },
                    { id: 'ripple', symbol: 'XRP', name: 'XRP', current_price: 0.6, price_change_percentage_24h: 1.2, market_cap: 33000000000, total_volume: 800000000, market_cap_rank: 5, image: 'https://assets.coincap.io/assets/icons/xrp@2x.png', sparkline_in_7d: null },
                    { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price: 0.45, price_change_percentage_24h: 2.1, market_cap: 16000000000, total_volume: 400000000, market_cap_rank: 6, image: 'https://assets.coincap.io/assets/icons/ada@2x.png', sparkline_in_7d: null },
                    { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', current_price: 35, price_change_percentage_24h: 3.8, market_cap: 13000000000, total_volume: 500000000, market_cap_rank: 7, image: 'https://assets.coincap.io/assets/icons/avax@2x.png', sparkline_in_7d: null },
                    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', current_price: 7, price_change_percentage_24h: 1.5, market_cap: 10000000000, total_volume: 300000000, market_cap_rank: 8, image: 'https://assets.coincap.io/assets/icons/dot@2x.png', sparkline_in_7d: null },
                    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', current_price: 0.15, price_change_percentage_24h: 5.2, market_cap: 22000000000, total_volume: 600000000, market_cap_rank: 9, image: 'https://assets.coincap.io/assets/icons/doge@2x.png', sparkline_in_7d: null },
                    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', current_price: 18, price_change_percentage_24h: 2.8, market_cap: 11000000000, total_volume: 400000000, market_cap_rank: 10, image: 'https://assets.coincap.io/assets/icons/link@2x.png', sparkline_in_7d: null },
                    { id: 'polygon-ecosystem-token', symbol: 'MATIC', name: 'Polygon', current_price: 0.7, price_change_percentage_24h: 3.5, market_cap: 7000000000, total_volume: 250000000, market_cap_rank: 11, image: 'https://assets.coincap.io/assets/icons/matic@2x.png', sparkline_in_7d: null },
                    { id: 'near', symbol: 'NEAR', name: 'NEAR Protocol', current_price: 5.5, price_change_percentage_24h: 4.1, market_cap: 6000000000, total_volume: 200000000, market_cap_rank: 12, image: 'https://assets.coincap.io/assets/icons/near@2x.png', sparkline_in_7d: null },
                    { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos', current_price: 8, price_change_percentage_24h: 2.3, market_cap: 3000000000, total_volume: 150000000, market_cap_rank: 13, image: 'https://assets.coincap.io/assets/icons/atom@2x.png', sparkline_in_7d: null },
                    { id: 'stellar', symbol: 'XLM', name: 'Stellar', current_price: 0.12, price_change_percentage_24h: 1.9, market_cap: 3500000000, total_volume: 100000000, market_cap_rank: 14, image: 'https://assets.coincap.io/assets/icons/xlm@2x.png', sparkline_in_7d: null },
                    { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum', current_price: 1.2, price_change_percentage_24h: 3.6, market_cap: 4000000000, total_volume: 300000000, market_cap_rank: 15, image: 'https://assets.coincap.io/assets/icons/arb@2x.png', sparkline_in_7d: null },
                    { id: 'optimism', symbol: 'OP', name: 'Optimism', current_price: 2.5, price_change_percentage_24h: 4.2, market_cap: 2500000000, total_volume: 200000000, market_cap_rank: 16, image: 'https://assets.coincap.io/assets/icons/op@2x.png', sparkline_in_7d: null }
                ];
                allCoins = defaultCoins;
                document.getElementById('lastUpdate').textContent = 'Дефолтные данные (ошибка API)';
            }
        }

        try {
            const r = await fetch(`${API_BASE}?path=global`);
            if (r.ok) {
                const ct = r.headers.get('content-type') || '';
                if (ct.includes('json')) {
                    globalData = await r.json();
                    renderHeader();
                }
            }
        } catch (e) { console.log('global fetch error', e); }

        try {
            const r = await fetch(FEAR_API);
            if (r.ok) {
                const ct = r.headers.get('content-type') || '';
                if (ct.includes('json')) {
                    fearData = await r.json();
                    renderHeader();
                }
            }
        } catch (e) { console.log('fear fetch error', e); }

        const cacheData = {
            time: Date.now(),
            coins: allCoins,
            global: globalData,
            fear: fearData,
            portfolioCoins: extraCoins
        };
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (e) {
            console.warn('Cache not saved: quota exceeded');
        }
        await refreshExtraCoins();
        syncAutoAlertsFromAdvisor();
        hideCorsWarning();
        renderAll();
        checkNotifs();
        document.getElementById('lastUpdate').textContent = 'обновлено: ' + new Date().toLocaleTimeString('ru-RU');
    } catch (e) {
        console.error('fetchAll error:', e);
        const cache = getCache();
        if (cache && (cache.portfolioCoins || cache.coins)) {
            allCoins = cache.portfolioCoins || cache.coins || [];
            if (cache.global) globalData = cache.global;
            if (cache.fear) fearData = cache.fear;
            await refreshExtraCoins();
            syncAutoAlertsFromAdvisor();
            renderAll();
            checkNotifs();
            document.getElementById('lastUpdate').textContent = 'Ошибка API, показан кэш';
        } else {
            document.getElementById('lastUpdate').textContent = 'Нет данных. Требуется первое подключение.';
        }
    }
}

function maybeShowCorsWarning(e) {
    const isFileProtocol = location.protocol === 'file:';
    const looksLikeFetchFail = e && (e.message === 'Failed to fetch' || /networkerror|failed to fetch/i.test(e.message || ''));
    if (isFileProtocol && looksLikeFetchFail && !allCoins.length) {
        document.getElementById('corsWarning').style.display = 'block';
    }
}

function hideCorsWarning() {
    const el = document.getElementById('corsWarning');
    if (el) el.style.display = 'none';
}

async function refreshExtraCoins() {
    const neededIds = [...new Set(portfolio.map(h => h.coinId).filter(id => id && !allCoins.find(c => c.id === id)))];
    if (!neededIds.length) return;
    
    // Загружаем из кэша extraCoins
    try { 
        const cached = JSON.parse(localStorage.getItem('ct_extra_coins') || '{}'); 
        Object.assign(extraCoins, cached); 
    } catch (e) {}
    
    // Проверяем, есть ли нужные монеты в кэше
    const missingFromCache = neededIds.filter(id => !extraCoins[id]);
    if (missingFromCache.length === 0) return;
    
    // Загружаем недостающие монеты через Vercel proxy
    const chunkSize = 20;
    for (let i = 0; i < missingFromCache.length; i += chunkSize) {
        const chunk = missingFromCache.slice(i, i + chunkSize);
        try {
            const res = await fetch(`${API_BASE}?path=coins/markets?vs_currency=usd&ids=${chunk.join(',')}&sparkline=true&price_change_percentage=24h,7d,30d`);
            if (res.ok) {
                const data = await res.json();
                data.forEach(c => { extraCoins[c.id] = c; });
            }
        } catch (e) { console.log('API fetch failed for extra coins:', e); }
        
        await new Promise(r => setTimeout(r, 1000)); 
    }
    try { localStorage.setItem('ct_extra_coins', JSON.stringify(extraCoins)); } catch (e) {}
}
// ============================================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С УВЕДОМЛЕНИЯМИ И АЛЕРТАМИ
// ============================================================

function addNotification(text, type) {
    notifications.push({ id: uid(), text, type, time: Date.now(), read: false });
    saveNotifs();
    updateNotifBadge();
    const title = type === 'buy' ? 'Сигнал на покупку' : type === 'sell' ? 'Сигнал на продажу' : 'Уведомление';
    pushBrowserNotification(title, text);
}

function pushBrowserNotification(title, body) {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;
    try {
        new Notification(title, { body, icon: 'https://www.coingecko.com/favicon.ico' });
    } catch (e) {}
}

async function ensureNotificationPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    try {
        const perm = await Notification.requestPermission();
        return perm === 'granted';
    } catch (e) {
        return false;
    }
}

function updateNotifBadge() {
    const unread = notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notifBadge');
    if (unread > 0) {
        badge.textContent = unread;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}

function toggleNotif(e) {
    if (e) e.stopPropagation();
    const dd = document.getElementById('notifDropdown');
    dd.classList.toggle('active');
    if (dd.classList.contains('active')) {
        renderNotifList();
        notifications.forEach(n => n.read = true);
        saveNotifs();
        updateNotifBadge();
    }
}

function renderNotifList() {
    const dd = document.getElementById('notifDropdown');
    let html = '';
    if (!notifications.length) {
        html += '<div class="notif-empty">Нет уведомлений</div>';
    } else {
        html += notifications.slice().reverse().slice(0, 30).map(n => {
            const time = new Date(n.time).toLocaleString('ru-RU');
            return '<div class="notif-item ' + (n.type === 'buy' ? 'buy' : n.type === 'sell' ? 'sell' : 'info') + '"><div>' + n.text + '</div><div class="notif-time">' + time + '</div></div>';
        }).join('');
    }

    const pendingAuto = alertsList.filter(a => !a.fired && a.autoGenerated);
    const pendingManual = alertsList.filter(a => !a.fired && !a.autoGenerated);

    if (pendingAuto.length) {
        html += '<div class="notif-section-title">AI авто-алерты (' + pendingAuto.length + ')</div>';
        html += pendingAuto.map(a =>
            '<div class="pending-alert-item"><span>' + a.symbol + ' ' + (a.type === 'below' ? 'ниже' : 'выше') + ' ' + fmt$(a.value) + (a.suggestedAmount > 0 ? (' · ~' + fmt$(a.suggestedAmount)) : '') + '</span><button onclick="removeAlert(\'' + a.id + '\')" title="удалить">&times;</button></div>'
        ).join('');
    }
    if (pendingManual.length) {
        html += '<div class="notif-section-title">Ручные алерты (' + pendingManual.length + ')</div>';
        html += pendingManual.map(a =>
            '<div class="pending-alert-item"><span>' + a.symbol + ' ' + (a.type === 'below' ? 'ниже' : 'выше') + ' ' + fmt$(a.value) + (a.suggestedAmount > 0 ? (' · ~' + fmt$(a.suggestedAmount)) : '') + '</span><button onclick="removeAlert(\'' + a.id + '\')" title="удалить">&times;</button></div>'
        ).join('');
    }

    // Добавляем кнопку очистки
    html += '<button class="clear-btn" onclick="clearNotifications()"><i class="fas fa-trash-alt"></i> Очистить все уведомления</button>';

    dd.innerHTML = html;
}

function clearNotifications() {
    notifications = [];
    saveNotifs();
    updateNotifBadge();
    renderNotifList();
}

function removeAlert(id) {
    alertsList = alertsList.filter(a => a.id !== id);
    saveAlerts();
    renderNotifList();
}

function checkNotifs() {
    let changed = false;
    alertsList.forEach(a => {
        if (a.fired) return;
        const c = findCoin(a.coinId);
        if (!c) return;
        const price = c.current_price;
        const triggered = a.type === 'below' ? price <= a.value : price >= a.value;
        if (triggered) {
            a.fired = true;
            changed = true;
            let txt = '';
            let notifType = 'info';
            if (a.action === 'buy' || (a.type === 'below' && a.action !== 'sell')) {
                txt = a.symbol + ': достигнута цена для докупки ' + fmt$(a.value) + '.';
                if (a.suggestedAmount > 0) txt += ' Рекомендуемая сумма ~' + fmt$(a.suggestedAmount) + '.';
                notifType = 'buy';
            } else {
                txt = a.symbol + ': достигнута цена для продажи ' + fmt$(a.value) + '.';
                notifType = 'sell';
            }
            addNotification(txt, notifType);
        }
    });
    if (changed) saveAlerts();
}

// ============================================================
// АВТОРИЗАЦИЯ (используем глобальные функции из auth.js)
// ============================================================

function updateAuthUI() {
    // Отключаем локальную логику portfolio.js, чтобы не конфликтовать с header.js
    // Вместо этого просто вызываем глобальные функции синхронизации хедера
    
    if (typeof window.updateUserUI === 'function' && window.currentUser) {
        window.updateUserUI(window.currentUser);
    }
    if (typeof window.syncAuth === 'function') {
        window.syncAuth();
    }
}
// Используем глобальные функции для входа/выхода
// openAuthModal, signOutUser, handleAuth, signInWithGoogle, toggleAuthMode, resetPassword
// все доступны из auth.js

// ============================================================
// РЕНДЕРИНГ ПОРТФЕЛЯ
// ============================================================

function renderAll() {
    checkOrderExecution();
    renderHeader();
    renderPortfolio();
    renderMarket();
    renderHeatmap();
    initDCA();
    renderOrders();
    if (document.getElementById('panel-advisor').classList.contains('active')) renderAdvisor();
    updateNotifBadge();
}

function renderHeader() {
    let totalVal = 0,
        totalInv = 0;
    portfolio.forEach(h => {
        const c = findCoin(h.coinId || h.symbol.toLowerCase());
        if (!c) return;
        totalVal += h.amount * c.current_price;
        totalInv += h.amount * h.avgPrice;
    });

    const pnl = totalInv > 0 ? ((totalVal - totalInv) / totalInv) * 100 : 0;
    const pnlDollar = totalVal - totalInv;
    const btcCoin = findCoin('bitcoin');
    const btcPrice = btcCoin ? btcCoin.current_price : 0;
    const btcValue = btcPrice > 0 ? totalVal / btcPrice : 0;

    const totalEl = document.getElementById('stTotal');
    if (totalEl) {
        totalEl.textContent = fmt$(totalVal);
        totalEl.title = btcPrice > 0 ? ('≈ ' + btcValue.toFixed(4) + ' BTC') : '';
    }

    const pnlEl = document.getElementById('stPnl');
    if (pnlEl) {
        pnlEl.innerHTML = fmtPct(pnl) + '<br><span style="font-size:13px;font-weight:600;">' + (pnlDollar >= 0 ? '+' : '') + fmt$(pnlDollar) + '</span>';
        pnlEl.className = 'stat-sub ' + (pnl >= 0 ? 'pos' : 'neg');
    }

    const investedEl = document.getElementById('stInvested');
    if (investedEl) investedEl.textContent = fmt$(totalInv);

    if (globalData && globalData.data) {
        const g = globalData.data;
        const capEl = document.getElementById('stCap');
        if (capEl) capEl.textContent = fmtLarge(g.total_market_cap.usd);
        const capCh = g.market_cap_change_percentage_24h_usd;
        const capChangeEl = document.getElementById('stCapChange');
        if (capChangeEl) {
            capChangeEl.textContent = fmtPct(capCh) + ' (24ч)';
            capChangeEl.className = 'stat-sub ' + (capCh >= 0 ? 'pos' : 'neg');
        }
        const btcDomEl = document.getElementById('stBtcDom');
        if (btcDomEl) btcDomEl.textContent = g.market_cap_percentage.btc.toFixed(1) + '%';
        const ethDomEl = document.getElementById('stEthDom');
        if (ethDomEl) ethDomEl.textContent = 'eth: ' + g.market_cap_percentage.eth.toFixed(1) + '%';
    }

    if (fearData && fearData.data && fearData.data[0]) {
        const f = parseInt(fearData.data[0].value);
        const cls = f < 25 ? 'neg' : f > 75 ? 'pos' : 'neu';
        const txt = f < 25 ? 'страх' : f > 75 ? 'жадность' : 'нейтрально';
        const fearEl = document.getElementById('stFear');
        if (fearEl) {
            fearEl.textContent = f + ' (' + txt + ')';
            fearEl.className = 'stat-value ' + cls;
        }
        const bar = document.getElementById('fearBar');
        if (bar) {
            bar.style.width = f + '%';
            bar.style.background = f < 30 ? 'var(--red)' : f > 70 ? 'var(--green)' : 'var(--yellow)';
        }
    }
}

function getPortfolioValue() {
    return portfolio.reduce((sum, h) => {
        const c = findCoin(h.coinId || h.symbol.toLowerCase());
        return sum + (c ? h.amount * c.current_price : 0);
    }, 0);
}

function getPortfolioRows() {
    const rows = [];
    portfolio.forEach(h => {
        const c = findCoin(h.coinId || h.symbol.toLowerCase());
        if (!c) return;
        const value = h.amount * c.current_price;
        const inv = h.amount * h.avgPrice;
        const pnl = h.avgPrice > 0 ? ((c.current_price - h.avgPrice) / h.avgPrice) * 100 : 0;
        const pnlDollar = value - inv;
        const realized = h.realizedPnl || 0;
        const currentX = h.avgPrice > 0 ? c.current_price / h.avgPrice : 0;
        const xNeeded = c.current_price > 0 ? h.avgPrice / c.current_price : 0;
        rows.push({ h, c, value, inv, pnl, pnlDollar, realized, price: c.current_price, amount: h.amount, avgPrice: h.avgPrice, currentX, xNeeded, name: c.name.toLowerCase() });
    });

    if (portfolioFilter) {
        const q = portfolioFilter.toLowerCase();
        return rows.filter(r => r.name.includes(q) || r.h.symbol.toLowerCase().includes(q));
    }

    if (portfolioSort.col) {
        rows.sort((a, b) => {
            if (portfolioSort.col === 'name') {
                const av = a.name,
                    bv = b.name;
                return portfolioSort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
            }
            const av = a[portfolioSort.col],
                bv = b[portfolioSort.col];
            return portfolioSort.dir === 'asc' ? av - bv : bv - av;
        });
    }
    return rows;
}

function renderPortfolio() {
    const container = document.querySelector('.table-wrap');
    if (!container) return;

    let totalVal = 0;
    const pieData = [];
    const rows = getPortfolioRows();

    rows.forEach((r, idx) => {
        const { h, c, value } = r;
        totalVal += value;
        pieData.push({ label: h.symbol, value: value, color: getColor(idx) });
    });

    drawPie(pieData, totalVal);

    if (portfolioViewMode === 'table') {
        const table = document.createElement('table');
        table.id = 'portTable';
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr>
            <th onclick="sortPortfolio('name')">Монета <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('amount')">Кол-во <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('avgPrice')">Средняя <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('price')">Цена <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('value')">Стоимость <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('pnl')">P&L % <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('pnlDollar')">P&L $ <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('realized')">Реализ. <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('currentX')">X <span class="sort-arrow">↕</span></th>
            <th onclick="sortPortfolio('xNeeded')">X до окупа <span class="sort-arrow">↕</span></th>
            <th class="no-sort">Действия</th>
        </tr>`;
        table.appendChild(thead);
        const tbody = document.createElement('tbody');

        rows.forEach((r, idx) => {
            const { h, c, value, pnl, pnlDollar, realized, currentX, xNeeded } = r;
            const tr = document.createElement('tr');
            tr.innerHTML =
                '<td><div class="coin-cell"><div class="coin-img"><img src="' + c.image + '" alt="" onerror="this.style.display=\'none\';this.parentNode.textContent=\'' + h.symbol[0] + '\'"></div><div><div class="coin-name" onclick="openChartModal(\'' + h.coinId + '\',\'' + h.symbol + '\')">' + c.name + '</div><div class="coin-symbol">' + h.symbol + '</div></div></div></td>' +
                '<td>' + h.amount.toLocaleString() + '</td>' +
                '<td>$' + h.avgPrice.toLocaleString() + '</td>' +
                '<td>' + fmt$(c.current_price) + '</td>' +
                '<td>' + fmt$(value) + '</td>' +
                '<td><span class="pnl-big ' + (pnl >= 0 ? 'pos' : 'neg') + '">' + fmtPct(pnl) + '</span></td>' +
                '<td><span class="' + (pnlDollar >= 0 ? 'pos' : 'neg') + '" style="font-weight:700;">' + (pnlDollar >= 0 ? '+' : '') + fmt$(pnlDollar) + '</span></td>' +
                '<td><span class="' + (realized >= 0 ? 'pos' : 'neg') + '" style="font-weight:700;">' + (realized >= 0 ? '+' : '') + fmt$(realized) + '</span></td>' +
                '<td><span class="' + (currentX >= 1 ? 'pos' : 'neg') + '" style="font-weight:700;">' + currentX.toFixed(2) + 'x</span></td>' +
                '<td><span class="' + (xNeeded <= 1 ? 'pos' : 'neg') + '" style="font-weight:700;">' + xNeeded.toFixed(2) + 'x</span></td>' +
                '<td><button class="btn btn-sm" onclick="toggleAdviceRow(\'' + h.id + '\')">рек ' + (expandedRows[h.id] ? '▲' : '▼') + '</button> <button class="btn btn-sm btn-blue" onclick="toggleDcaCalculator(\'' + h.id + '\')">DCA</button> <button class="btn btn-sm btn-blue" onclick="openTxModal(\'' + h.id + '\')">транз.</button> <button class="btn btn-sm btn-danger" onclick="delHolding(\'' + h.id + '\')">удл</button></td>';
            tbody.appendChild(tr);

            if (expandedRows[h.id]) {
                const adv = generateCoinAdvice(h, c);
                const autoInfo = adv.autoAlert ?
                    '<div style="margin-top:10px;font-size:12px;color:var(--text-3)">Авто-алерт: ' + (adv.autoAlert.type === 'below' ? 'ниже ' : 'выше ') + fmt$(adv.autoAlert.value) + (adv.autoAlert.suggestedAmount ? (' · сумма ~' + fmt$(adv.autoAlert.suggestedAmount)) : '') + '</div>' :
                    '';

                const dcaState = dcaCalculatorState.get(h.id) || { showCalculator: false, buyAmount: 10, buyQuantity: 0, buyPrice: c.current_price };
                if (dcaState.buyPrice === 0) {
                    dcaState.buyPrice = c.current_price;
                    dcaCalculatorState.set(h.id, dcaState);
                }
                const dcaResults = dcaState.showCalculator ? calculateDCAResults(h, c, dcaState.buyAmount, dcaState.buyQuantity, dcaState.buyPrice) : null;

                let dcaHtml = '';
                if (dcaState.showCalculator && dcaResults) {
                    const recColor = dcaResults.recommendation === 'recommended' ? 'var(--green)' : (dcaResults.recommendation === 'not_recommended' ? 'var(--red)' : 'var(--yellow)');
                    const recBadge = dcaResults.recommendation === 'recommended' ? 'РЕКОМЕНДУЕТСЯ' : (dcaResults.recommendation === 'not_recommended' ? 'НЕ РЕКОМЕНДУЕТСЯ' : 'НЕЙТРАЛЬНО');

                    dcaHtml = `
                        <div class="dca-wrapper">
                            <div class="dca-title">📊 DCA Калькулятор - ${h.symbol}</div>
                            <div class="dca-grid-group">
                                <div class="dca-item"><div class="dca-item-label">Текущая средняя ($)</div><div class="dca-item-value">${dcaResults.currentAvg.toFixed(2)}</div></div>
                                <div class="dca-item"><div class="dca-item-label">Текущее кол-во</div><div class="dca-item-value">${dcaResults.currentAmount.toFixed(4)}</div></div>
                                <div class="dca-item"><div class="dca-item-label">Текущая цена ($)</div><div class="dca-item-value">${dcaResults.currentPrice.toFixed(2)}</div></div>
                                <div class="dca-item"><div class="dca-item-label">Текущие вложения ($)</div><div class="dca-item-value">${(dcaResults.currentAmount * dcaResults.currentAvg).toFixed(2)}</div></div>
                                <div class="dca-item"><div class="dca-item-label">Текущий P&L</div><div class="dca-item-value ${dcaResults.currentPnl >= 0 ? 'green' : 'red'}">${dcaResults.currentPnl >= 0 ? '+' : ''}${dcaResults.currentPnl.toFixed(2)}%</div></div>
                            </div>
                            <div class="dca-inputs">
                                <div class="dca-input-group">
                                    <label>Сумма докупки ($)</label>
                                    <input type="number" id="dca-buy-amount-${h.id}" value="${dcaState.buyAmount}" oninput="updateDcaAmount('${h.id}', this.value)">
                                </div>
                                <div class="dca-input-group">
                                    <label>Или количество</label>
                                    <input type="number" id="dca-buy-quantity-${h.id}" value="${dcaState.buyQuantity}" oninput="updateDcaQuantity('${h.id}', this.value)">
                                </div>
                                <div class="dca-input-group">
                                    <label>Цена покупки ($)</label>
                                    <input type="number" id="dca-buy-price-${h.id}" value="${dcaState.buyPrice || c.current_price}" oninput="updateDcaPrice('${h.id}', this.value)">
                                </div>
                            </div>
                            <div class="dca-results">
                                <div class="dca-result-item"><div class="label">Новая средняя</div><div class="value blue" id="dca-new-avg-${h.id}">$${dcaResults.newAvg.toFixed(2)}</div></div>
                                <div class="dca-result-item"><div class="label">Итого монет</div><div class="value" id="dca-new-amount-${h.id}">${dcaResults.newAmount.toFixed(4)}</div></div>
                                <div class="dca-result-item"><div class="label">Всего вложено</div><div class="value" id="dca-total-invested-${h.id}">$${dcaResults.totalInvested.toFixed(2)}</div></div>
                                <div class="dca-result-item"><div class="label">Нужен рост до окупа</div><div class="value ${dcaResults.growthNeeded >= 0 ? 'red' : 'green'}" id="dca-growth-needed-${h.id}">${dcaResults.growthNeeded >= 0 ? '+' : ''}${dcaResults.growthNeeded.toFixed(1)}%</div></div>
                                <div class="dca-result-item"><div class="label">Нужно иксов</div><div class="value ${dcaResults.growthNeeded >= 0 ? 'red' : 'green'}" id="dca-x-needed-${h.id}">${(dcaResults.newAvg / dcaResults.currentPrice).toFixed(2)}x</div></div>
                            </div>
                            <div class="dca-recommendation ${dcaResults.recommendation === 'recommended' ? 'rec-recommended' : (dcaResults.recommendation === 'not_recommended' ? 'rec-not-recommended' : 'rec-neutral')}">
                                <div class="rec-badge" style="color:${recColor};">${recBadge}</div>
                                <div class="rec-text" id="dca-rec-text-${h.id}">${dcaResults.recommendationText}</div>
                            </div>
                        </div>
                    `;
                }

                const exTr = document.createElement('tr');
                exTr.className = 'expand-row';
                exTr.innerHTML = '<td colspan="9"><div class="advice-card ' + adv.type + '" style="margin-bottom:0;"><div class="advice-header"><div class="advice-title">Рекомендация</div><span class="advice-badge badge-' + adv.badge + '">' + (adv.badge === 'buy' ? 'КУПИТЬ' : adv.badge === 'sell' ? 'ПРОДАТЬ' : 'ДЕРЖАТЬ') + '</span></div><div class="advice-text">' + adv.text + '</div>' + adv.actionHtml + autoInfo + dcaHtml + '</div></td>';
                tbody.appendChild(exTr);
            }
        });

        table.appendChild(tbody);
        container.innerHTML = '';
        container.appendChild(table);
    } else {
        const grid = document.createElement('div');
        grid.className = 'portfolio-card-grid';
        rows.forEach((r) => {
            const card = createPortfolioCard(r);
            grid.appendChild(card);
        });
        container.innerHTML = '';
        container.appendChild(grid);
    }

    // Обновляем активные кнопки сортировки
    document.querySelectorAll('#portTable th').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
    const activeTh = document.querySelector('#portTable th[onclick*="' + portfolioSort.col + '"]');
    if (activeTh) activeTh.classList.add(portfolioSort.dir === 'asc' ? 'sort-asc' : 'sort-desc');
}

function createPortfolioCard(r) {
    const { h, c, value, inv, pnl, pnlDollar, realized, currentX, xNeeded, price, amount, avgPrice } = r;
    const pnlClass = pnl >= 0 ? 'pos' : 'neg';
    const ch24 = c.price_change_percentage_24h || 0;
    const ch24Class = ch24 >= 0 ? 'pos' : 'neg';

    const showCurrentX = pnl >= 0;
    const xLabel = showCurrentX ? 'Текущие иксы' : 'Иксы до окупа';
    const xValue = showCurrentX ? currentX : xNeeded;
    const xClass = showCurrentX ? (currentX >= 1 ? 'pos' : 'neg') : (xNeeded <= 1 ? 'pos' : 'neg');

    const pnlFormatted = (pnl >= 0 ? '+' : '') + pnl.toFixed(2) + '%';

    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.innerHTML = `
        <div class="portfolio-card-pnl-badge ${pnlClass}">${pnlFormatted}</div>
        <div class="portfolio-card-change-row">
            <span class="change ${ch24Class}">${ch24 >= 0 ? '+' : ''}${ch24.toFixed(2)}% 24ч</span>
        </div>
        <div class="portfolio-card-top">
            <div class="portfolio-card-left">
                <img src="${c.image}" class="portfolio-card-img" onerror="this.style.display='none'">
                <div class="portfolio-card-name-group">
                    <div class="portfolio-card-symbol">${h.symbol}</div>
                    <div class="portfolio-card-name">${c.name}</div>
                </div>
            </div>
            <div class="portfolio-card-price">${fmt$(price)}</div>
        </div>
        <div class="portfolio-card-body">
            <div class="portfolio-card-row"><span class="label">Кол-во</span><span class="value">${amount.toFixed(4)}</span></div>
            <div class="portfolio-card-row"><span class="label">Средняя</span><span class="value">${fmt$(avgPrice)}</span></div>
            <div class="portfolio-card-row"><span class="label">Стоимость</span><span class="value">${fmt$(value)}</span></div>
            <div class="portfolio-card-row"><span class="label">Вложено</span><span class="value">${fmt$(inv)}</span></div>
            <div class="portfolio-card-row"><span class="label">P&L $</span><span class="value ${pnlDollar >= 0 ? 'pos' : 'neg'}">${pnlDollar >= 0 ? '+' : ''}${fmt$(pnlDollar)}</span></div>
            <div class="portfolio-card-row"><span class="label">${xLabel}</span><span class="value ${xClass}">${xValue.toFixed(2)}x</span></div>
        </div>
        <div class="portfolio-card-actions">
            <button class="btn btn-sm btn-blue" onclick="openTxModal('${h.id}')">транз.</button>
            <button class="btn btn-sm btn-blue" onclick="toggleDcaCalculator('${h.id}')">DCA</button>
            <button class="btn btn-sm btn-danger" onclick="delHolding('${h.id}')">удал</button>
        </div>
    `;
    return card;
}

function setPortfolioViewMode(mode) {
    portfolioViewMode = mode;
    localStorage.setItem('ct_portfolio_view_mode', mode);
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === mode);
    });
    renderPortfolio();
}

function sortPortfolio(col) {
    if (portfolioSort.col === col) portfolioSort.dir = portfolioSort.dir === 'asc' ? 'desc' : 'asc';
    else { portfolioSort.col = col;
        portfolioSort.dir = 'desc'; }
    renderPortfolio();
}

function toggleAdviceRow(id) {
    expandedRows[id] = !expandedRows[id];
    renderPortfolio();
}

function filterPortfolio(query) {
    portfolioFilter = query.toLowerCase().trim();
    renderPortfolio();
}

// ============================================================
// ПИЕ-ГРАФИК
// ============================================================

let othersExpanded = false;
let othersCoins = [];

function drawPie(data, total) {
    const canvas = document.getElementById('pieCanvas');
    const ctx = canvas.getContext('2d');
    const legend = document.getElementById('pieLegend');
    ctx.clearRect(0, 0, 180, 180);
    legend.innerHTML = '';
    if (!data.length) return;

    const sortedData = [...data].sort((a, b) => b.value - a.value);

    let filtered = [];
    let othersValue = 0;
    othersCoins = [];

    sortedData.forEach(d => {
        const pct = total > 0 ? (d.value / total) * 100 : 0;
        if (pct >= 1) filtered.push(d);
        else {
            othersValue += d.value;
            othersCoins.push(d);
        }
    });

    if (othersValue > 0) {
        filtered.push({ label: 'Остальные', value: othersValue, color: '#64748b', isOthers: true });
    }

    let start = 0;
    filtered.forEach(d => {
        const slice = (d.value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(90, 90);
        ctx.arc(90, 90, 70, start, start + slice);
        ctx.fillStyle = d.color;
        ctx.fill();
        start += slice;
    });
    ctx.beginPath();
    ctx.arc(90, 90, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#111827';
    ctx.fill();

    legend.innerHTML = filtered.map(d => {
        const clickHandler = d.isOthers ? 'onclick="toggleOthersList()"' : '';
        const styleHandler = d.isOthers ? 'cursor:pointer;' : '';
        const arrow = d.isOthers ? (othersExpanded ? '▼' : '▶') : '';
        return '<div class="legend-row" ' + clickHandler + ' style="white-space:nowrap;' + styleHandler + '"><div class="legend-dot" style="background:' + d.color + '"></div><span>' + arrow + ' ' + d.label + ' <span style="color:var(--text-3)">' + ((d.value / total) * 100).toFixed(1) + '%</span></span></div>';
    }).join('');

    if (othersExpanded && othersCoins.length > 0) {
        const othersList = document.createElement('div');
        othersList.id = 'othersList';
        othersList.style.cssText = 'margin-top:8px;padding:8px;background:rgba(100,116,139,0.1);border-radius:4px;font-size:12px;';
        othersList.innerHTML = othersCoins.map(d => {
            const pct = total > 0 ? (d.value / total) * 100 : 0;
            return '<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(100,116,139,0.2);"><span>' + d.label + '</span><span style="color:var(--text-3)">' + pct.toFixed(2) + '%</span></div>';
        }).join('');
        legend.appendChild(othersList);
    }
}

function toggleOthersList() {
    othersExpanded = !othersExpanded;
    const portfolioValue = getPortfolioValue();
    const pieData = portfolio.map((h, idx) => {
        const c = findCoin(h.coinId || h.symbol.toLowerCase());
        return { label: h.symbol, value: h.amount * (c ? c.current_price : 0), color: getColor(idx) };
    });
    drawPie(pieData, portfolioValue);
}

// ============================================================
// РЫНОК
// ============================================================

function renderMarket() {
    const tbody = document.querySelector('#marketTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    let sorted = [...allCoins];
    if (marketFilter) {
        sorted = sorted.filter(c => c.name.toLowerCase().includes(marketFilter) || c.symbol.toLowerCase().includes(marketFilter));
    }
    const col = marketSort.col;
    const dir = marketSort.dir;
    sorted.sort((a, b) => {
        let av = a[col] || 0;
        let bv = b[col] || 0;
        if (col === 'ath_change_percentage') { av = a.ath ? ((a.current_price - a.ath) / a.ath) * 100 : 0;
            bv = b.ath ? ((b.current_price - b.ath) / b.ath) * 100 : 0; }
        return dir === 'asc' ? av - bv : bv - av;
    });

    const countEl = document.getElementById('marketCount');
    if (countEl) countEl.textContent = sorted.length + ' монет';

    sorted.forEach((c, i) => {
        const hasAth = typeof c.ath === 'number' && c.ath > 0;
        const fromAth = hasAth ? ((c.current_price - c.ath) / c.ath) * 100 : null;
        const spark = c.sparkline_in_7d ? c.sparkline_in_7d.price : [];
        const tr = document.createElement('tr');
        tr.innerHTML =
            '<td>' + (c.market_cap_rank || i + 1) + '</td>' +
            '<td><div class="coin-cell"><div class="coin-img"><img src="' + c.image + '" alt="" onerror="this.style.display=\'none\';this.parentNode.textContent=\'' + c.symbol[0].toUpperCase() + '\'"></div><div><div class="coin-name" onclick="openChartModal(\'' + c.id + '\',\'' + c.symbol.toUpperCase() + '\')">' + c.name + '</div><div class="coin-symbol">' + c.symbol.toUpperCase() + '</div></div></div></td>' +
            '<td>' + fmt$(c.current_price) + '</td>' +
            '<td class="' + ((c.price_change_percentage_24h || 0) >= 0 ? 'pos' : 'neg') + '">' + fmtPct(c.price_change_percentage_24h || 0) + '</td>' +
            '<td class="' + ((c.price_change_percentage_7d_in_currency || 0) >= 0 ? 'pos' : 'neg') + '">' + fmtPct(c.price_change_percentage_7d_in_currency || 0) + '</td>' +
            '<td>' + fmtLarge(c.market_cap) + '</td>' +
            '<td>' + fmtLarge(c.total_volume) + '</td>' +
            '<td class="' + (hasAth ? (fromAth >= 0 ? 'pos' : 'neg') : 'neu') + '">' + (hasAth ? fmtPct(fromAth) : 'н/д') + '</td>' +
            '<td>' + drawSparkline(spark) + '</td>';
        tbody.appendChild(tr);
    });

    document.querySelectorAll('#marketTable th').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
    const activeTh = document.querySelector('#marketTable th[onclick*="' + col + '"]');
    if (activeTh) activeTh.classList.add(dir === 'asc' ? 'sort-asc' : 'sort-desc');
}

function filterMarket(query) {
    marketFilter = query.toLowerCase().trim();
    renderMarket();
}

function sortMarket(col) {
    if (marketSort.col === col) marketSort.dir = marketSort.dir === 'asc' ? 'desc' : 'asc';
    else { marketSort.col = col;
        marketSort.dir = 'desc'; }
    renderMarket();
}

function drawSparkline(prices) {
    if (!prices || prices.length < 2) return '';
    const w = 100,
        h = 32;
    const min = Math.min(...prices),
        max = Math.max(...prices);
    const range = max - min || 1;
    const pts = prices.map((p, i) => (i / (prices.length - 1)) * w + ',' + (h - ((p - min) / range) * h)).join(' ');
    const color = prices[prices.length - 1] >= prices[0] ? '#22c55e' : '#ef4444';
    return '<svg width="' + w + '" height="' + h + '" style="vertical-align:middle"><polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="1.5"/></svg>';
}

// ============================================================
// ТЕПЛОВАЯ КАРТА
// ============================================================

function renderHeatmap() {
    const grid = document.getElementById('heatmapGrid');
    if (!grid) return;
    grid.innerHTML = '';
    allCoins.forEach(c => {
        const ch = c.price_change_percentage_24h || 0;
        const intensity = Math.min(Math.abs(ch) / 15, 1);
        const isUp = ch >= 0;
        const size = Math.max(1, Math.log10(c.market_cap / 1e8 + 1));
        const el = document.createElement('div');
        el.className = 'heatmap-item';
        el.style.background = isUp ? 'rgba(34,197,94,' + (intensity * 0.6 + 0.15) + ')' : 'rgba(239,68,68,' + (intensity * 0.6 + 0.15) + ')';
        el.style.gridColumn = 'span ' + Math.min(Math.ceil(size), 4);
        el.style.gridRow = 'span ' + Math.min(Math.ceil(size), 4);
        el.onclick = () => openChartModal(c.id, c.symbol.toUpperCase());
        el.innerHTML = '<div class="hm-symbol">' + c.symbol.toUpperCase() + '</div><div class="hm-change ' + (isUp ? 'pos' : 'neg') + '">' + fmtPct(ch) + '</div><div class="hm-cap">' + fmtLarge(c.market_cap) + '</div>';
        grid.appendChild(el);
    });
}

// ============================================================
// DCA КАЛЬКУЛЯТОР
// ============================================================

let dcaCalculatorState = new Map();

function initDCA() {
    const sel = document.getElementById('dcaCoin');
    if (!sel) return;
    const prev = sel.value;
    sel.innerHTML = '<option value="">выберите монету</option>' + portfolio.map(h => '<option value="' + h.id + '">' + h.symbol + '</option>').join('');
    if (prev && portfolio.some(h => h.id === prev)) {
        sel.value = prev;
        updateDCA();
    }
}

function updateDCA() {
    const id = document.getElementById('dcaCoin').value;
    const h = portfolio.find(x => x.id === id);
    if (!h) { document.getElementById('dcaResult').style.display = 'none'; return; }
    const c = findCoin(h.coinId || h.symbol.toLowerCase());
    if (!c) return;

    document.getElementById('dcaAvg').value = h.avgPrice;
    document.getElementById('dcaQty').value = h.amount;
    document.getElementById('dcaPrice').value = c.current_price;

    const inv = h.amount * h.avgPrice;
    const defaultInvest = Math.max(10, Math.round((inv * 0.2) * 100) / 100);
    document.getElementById('dcaInvest').value = defaultInvest;
    document.getElementById('dcaAddQty').value = '';
    calcDCA(true);
}

function calcDCA(fromInvest) {
    const id = document.getElementById('dcaCoin').value;
    const h = portfolio.find(x => x.id === id);
    if (!h) return;
    const c = findCoin(h.coinId || h.symbol.toLowerCase());
    if (!c) return;

    let invest = parseFloat(document.getElementById('dcaInvest').value) || 0;
    let addQty = parseFloat(document.getElementById('dcaAddQty').value) || 0;

    if (fromInvest === true) {
        addQty = invest > 0 ? invest / c.current_price : 0;
        document.getElementById('dcaAddQty').value = addQty ? addQty.toFixed(6) : '';
    } else if (fromInvest === false) {
        invest = addQty * c.current_price;
        document.getElementById('dcaInvest').value = invest ? invest.toFixed(2) : '';
    }

    const qty = addQty;
    if (qty <= 0) { document.getElementById('dcaResult').style.display = 'none'; return; }

    const totalQty = h.amount + qty;
    const totalInv = h.amount * h.avgPrice + qty * c.current_price;
    const newAvg = totalInv / totalQty;
    const breakEven = ((newAvg - c.current_price) / c.current_price) * 100;
    const curPnl = h.avgPrice > 0 ? ((c.current_price - h.avgPrice) / h.avgPrice) * 100 : 0;

    let recText = '',
        recClass = '',
        actionHtml = '';

    if (curPnl < -50) {
        recText = 'СИЛЬНАЯ ДОКУПКА';
        recClass = 'pos';
        actionHtml = '<div style="background:var(--green-dim);border-left:3px solid var(--green);padding:12px;border-radius:0 var(--radius-sm) var(--radius-sm) 0;"><strong style="color:var(--green)">Просадка &gt;50% — хороший момент для усреднения.</strong><br>Докупить на <strong>' + fmt$(invest || qty * c.current_price) + '</strong> → получите <strong>' + qty.toFixed(4) + ' ' + h.symbol + '</strong><br>Средняя цена изменится с <strong>$' + h.avgPrice + '</strong> → <strong>$' + newAvg.toFixed(2) + '</strong><br>Для окупаемости нужен рост всего <strong>+' + breakEven.toFixed(1) + '%</strong> (сейчас ' + fmtPct(curPnl) + ')</div>';
    } else if (curPnl < -20) {
        recText = 'УМЕРЕННАЯ ДОКУПКА';
        recClass = 'pos';
        actionHtml = '<div style="background:var(--green-dim);border-left:3px solid var(--green);padding:12px;border-radius:0 var(--radius-sm) var(--radius-sm) 0;"><strong style="color:var(--green)">Просадка -20..-50%: докупайте частями на каждые -10%.</strong><br>Докупить на <strong>' + fmt$(invest || qty * c.current_price) + '</strong> → получите <strong>' + qty.toFixed(4) + ' ' + h.symbol + '</strong><br>Средняя цена изменится с <strong>$' + h.avgPrice + '</strong> → <strong>$' + newAvg.toFixed(2) + '</strong></div>';
    } else if (curPnl > 30) {
        recText = 'ДОКУПКА НЕ РЕКОМЕНДУЕТСЯ';
        recClass = 'neg';
        actionHtml = '<div style="background:var(--red-dim);border-left:3px solid var(--red);padding:12px;border-radius:0 var(--radius-sm) var(--radius-sm) 0;"><strong style="color:var(--red)">Почему не докупать:</strong><br>Монета уже в плюсе на <strong>' + fmtPct(curPnl) + '</strong>. Докупка поднимет среднюю с <strong>$' + h.avgPrice + '</strong> → <strong>$' + newAvg.toFixed(2) + '</strong><br>Это увеличит риск: для окупа нужен рост <strong>+' + breakEven.toFixed(1) + '%</strong><br><em style="color:var(--text-3)">Лучше зафиксировать часть прибыли или ждать отката</em></div>';
    } else {
        recText = 'НЕЙТРАЛЬНО';
        recClass = 'neu';
        actionHtml = '<div style="background:rgba(245,158,11,0.08);border-left:3px solid var(--yellow);padding:12px;border-radius:0 var(--radius-sm) var(--radius-sm) 0;"><strong style="color:var(--yellow)">Анализ:</strong><br>Текущий p&amp;l: <strong>' + fmtPct(curPnl) + '</strong>. Докупка на <strong>' + fmt$(invest || qty * c.current_price) + '</strong> изменит среднюю с <strong>$' + h.avgPrice + '</strong> → <strong>$' + newAvg.toFixed(2) + '</strong><br>Для окупа после докупки нужен рост <strong>+' + breakEven.toFixed(1) + '%</strong><br><em style="color:var(--text-3)">Решение зависит от вашей стратегии.</em></div>';
    }

    document.getElementById('dcaNewAvg').textContent = '$' + newAvg.toFixed(2);
    document.getElementById('dcaTotalQty').textContent = totalQty.toFixed(4);
    document.getElementById('dcaTotalInv').textContent = fmt$(totalInv);
    document.getElementById('dcaBreakEven').textContent = '+' + breakEven.toFixed(1) + '%';
    document.getElementById('dcaCurPnl').textContent = fmtPct(curPnl);
    document.getElementById('dcaCurPnl').className = 'dca-metric-value ' + (curPnl >= 0 ? 'pos' : 'neg');
    document.getElementById('dcaRec').textContent = recText;
    document.getElementById('dcaRec').className = 'dca-metric-value ' + recClass;
    document.getElementById('dcaAction').innerHTML = actionHtml;
    document.getElementById('dcaResult').style.display = 'block';
}

function toggleDcaCalculator(holdingId) {
    const state = dcaCalculatorState.get(holdingId) || { showCalculator: false, buyAmount: 10, buyQuantity: 0, buyPrice: 0 };
    state.showCalculator = !state.showCalculator;
    dcaCalculatorState.set(holdingId, state);
    renderPortfolio();
}

function updateDcaAmount(holdingId, value) {
    const state = dcaCalculatorState.get(holdingId) || { showCalculator: true, buyAmount: 0, buyQuantity: 0, buyPrice: 0 };
    state.buyAmount = parseFloat(value) || 0;
    if (state.buyPrice > 0) {
        state.buyQuantity = state.buyAmount / state.buyPrice;
    } else {
        state.buyQuantity = 0;
    }
    dcaCalculatorState.set(holdingId, state);
    updateDcaResultsUI(holdingId);
}

function updateDcaQuantity(holdingId, value) {
    const state = dcaCalculatorState.get(holdingId) || { showCalculator: true, buyAmount: 0, buyQuantity: 0, buyPrice: 0 };
    state.buyQuantity = parseFloat(value) || 0;
    if (state.buyPrice > 0) {
        state.buyAmount = state.buyQuantity * state.buyPrice;
    } else {
        state.buyAmount = 0;
    }
    dcaCalculatorState.set(holdingId, state);
    updateDcaResultsUI(holdingId);
}

function updateDcaPrice(holdingId, value) {
    const state = dcaCalculatorState.get(holdingId) || { showCalculator: true, buyAmount: 0, buyQuantity: 0, buyPrice: 0 };
    state.buyPrice = parseFloat(value) || 0;
    if (state.buyAmount > 0) {
        state.buyQuantity = state.buyAmount / state.buyPrice;
    } else if (state.buyQuantity > 0) {
        state.buyAmount = state.buyQuantity * state.buyPrice;
    }
    dcaCalculatorState.set(holdingId, state);
    updateDcaResultsUI(holdingId);
}

function updateDcaResultsUI(holdingId) {
    const h = portfolio.find(p => p.id === holdingId);
    if (!h) return;
    const c = findCoin(h.coinId || h.symbol.toLowerCase());
    if (!c) return;

    const state = dcaCalculatorState.get(holdingId);
    if (!state) return;

    const results = calculateDCAResults(h, c, state.buyAmount, state.buyQuantity, state.buyPrice);

    const newAvgEl = document.getElementById('dca-new-avg-' + holdingId);
    const newAmountEl = document.getElementById('dca-new-amount-' + holdingId);
    const totalInvestedEl = document.getElementById('dca-total-invested-' + holdingId);
    const growthNeededEl = document.getElementById('dca-growth-needed-' + holdingId);
    const xNeededEl = document.getElementById('dca-x-needed-' + holdingId);
    const recTextEl = document.getElementById('dca-rec-text-' + holdingId);

    if (newAvgEl) newAvgEl.textContent = '$' + results.newAvg.toFixed(2);
    if (newAmountEl) newAmountEl.textContent = results.newAmount.toFixed(4);
    if (totalInvestedEl) totalInvestedEl.textContent = '$' + results.totalInvested.toFixed(2);
    if (growthNeededEl) {
        growthNeededEl.textContent = (results.growthNeeded >= 0 ? '+' : '') + results.growthNeeded.toFixed(1) + '%';
        growthNeededEl.style.color = results.growthNeeded >= 0 ? 'var(--red)' : 'var(--green)';
    }
    if (xNeededEl) {
        const xNeeded = results.newAvg / results.currentPrice;
        xNeededEl.textContent = xNeeded.toFixed(2) + 'x';
        xNeededEl.style.color = results.growthNeeded >= 0 ? 'var(--red)' : 'var(--green)';
    }
    if (recTextEl) {
        recTextEl.textContent = results.recommendationText;
    }
}

function calculateDCAResults(h, c, buyAmount, buyQuantity, buyPrice) {
    const currentAmount = h.amount;
    const currentAvg = h.avgPrice;
    const currentPrice = c.current_price;

    const validBuyPrice = buyPrice > 0 ? buyPrice : currentPrice;

    let actualBuyAmount = buyAmount;
    let actualBuyQuantity = buyQuantity;

    if (buyAmount > 0 && buyQuantity === 0) {
        actualBuyQuantity = buyAmount / validBuyPrice;
    } else if (buyQuantity > 0 && buyAmount === 0) {
        actualBuyAmount = buyQuantity * validBuyPrice;
    } else if (buyAmount === 0 && buyQuantity === 0) {
        return {
            currentAvg,
            currentAmount,
            currentPrice,
            buyAmount: 0,
            buyQuantity: 0,
            buyPrice: validBuyPrice,
            newAvg: currentAvg,
            newAmount: currentAmount,
            totalInvested: currentAmount * currentAvg,
            currentValue: currentAmount * currentPrice,
            growthNeeded: ((currentAvg - currentPrice) / currentPrice) * 100,
            currentPnl: ((currentPrice - currentAvg) / currentAvg) * 100,
            recommendation: 'neutral',
            recommendationText: 'Введите сумму или количество докупки для расчета.'
        };
    }

    const newAmount = currentAmount + actualBuyQuantity;
    const newAvg = (currentAmount * currentAvg + actualBuyQuantity * validBuyPrice) / newAmount;
    const totalInvested = currentAmount * currentAvg + actualBuyAmount;
    const currentValue = newAmount * currentPrice;
    const breakEvenPrice = newAvg;
    const growthNeeded = ((breakEvenPrice - currentPrice) / currentPrice) * 100;
    const currentPnl = ((currentPrice - currentAvg) / currentAvg) * 100;

    let recommendation = 'neutral';
    let recommendationText = '';

    if (currentPnl > 100) {
        recommendation = 'not_recommended';
        recommendationText = 'Монета уже в значительном плюсе на ' + currentPnl.toFixed(1) + '%. Докупка поднимет среднюю с $' + currentAvg.toFixed(2) + ' → $' + newAvg.toFixed(2) + '. Это увеличит риск: для окупа нужен рост ' + growthNeeded.toFixed(1) + '%. Лучше зафиксировать часть прибыли или ждать отката.';
    } else if (currentPnl < -30 && growthNeeded < 20) {
        recommendation = 'recommended';
        recommendationText = 'Монета в глубокой просадке на ' + currentPnl.toFixed(1) + '%. Докупка значительно снизит среднюю цену с $' + currentAvg.toFixed(2) + ' → $' + newAvg.toFixed(2) + '. Для окупа нужен рост только ' + growthNeeded.toFixed(1) + '%. Хорошая точка для усреднения.';
    } else if (currentPnl < -50) {
        recommendation = 'recommended';
        recommendationText = 'Глубокая просадка на ' + currentPnl.toFixed(1) + '%. Докупка снизит среднюю и уменьшит точку безубыточности.';
    } else {
        recommendation = 'neutral';
        recommendationText = 'Текущая ситуация нейтральная. Докупка возможна, но не критически важна.';
    }

    return {
        currentAvg,
        currentAmount,
        currentPrice,
        buyAmount: actualBuyAmount,
        buyQuantity: actualBuyQuantity,
        buyPrice: validBuyPrice,
        newAvg,
        newAmount,
        totalInvested,
        currentValue,
        growthNeeded,
        currentPnl,
        recommendation,
        recommendationText
    };
}

// ============================================================
// AI СОВЕТНИК
// ============================================================

function generateCoinAdvice(h, c) {
    const s = getAdviceScores(h, c);

    if (!s || typeof s.buyScore === 'undefined' || typeof s.sellScore === 'undefined') {
        return {
            type: 'hold',
            badge: 'hold',
            text: '<strong>Недостаточно данных:</strong> не удалось рассчитать сигналы для ' + h.symbol + '. Возможно, нет данных о цене или истории.',
            actionHtml: '',
            autoAlert: { enabled: false },
            s: s || { buyScore: 0, sellScore: 0, coinInfo: getCoinInfo(h.symbol, c) }
        };
    }

    const pnl = s.pnl;
    const drawdown = s.drawdown;
    const ch24 = s.ch24;
    const ch7 = s.ch7;
    const val = h.amount * c.current_price;
    const inv = h.amount * h.avgPrice;
    const riskLevel = s.riskLevel;
    const category = s.category;
    const subcategory = s.subcategory;
    const coinInfo = s.coinInfo;
    const marketPhase = s.marketPhase;
    const riskScore = s.riskScore;
    const rsi = s.rsi;
    const emaTrend = s.emaTrend;
    const btcTrend = s.btcTrend;

    let type = 'hold';
    let badge = 'hold';
    let text = '';
    let actionHtml = '';
    let autoAlert = null;

    const riskLabel = getRiskLabel(s);

    // Check if recommendation should be skipped due to recent user action
    if (shouldSkipRecommendation(h, c, 'sell')) {
        type = 'hold';
        badge = 'hold';
        text = '<strong>Недавно продавали:</strong> ' + s.coinInfo.name + ' - рекомендация отложена на 24 часа после последнего действия. Дайте рынку время для определения направления.';
        actionHtml = '';
        autoAlert = { enabled: false };
        return { type, badge, text, actionHtml, autoAlert, s };
    }

    if (shouldSkipRecommendation(h, c, 'buy')) {
        const lastAction = recentUserActions.get(h.id);
        const hoursSince = (Date.now() - lastAction.timestamp) / (1000 * 60 * 60);
        const priceChange = Math.abs((c.current_price - lastAction.price) / lastAction.price) * 100;
        type = 'hold';
        badge = 'hold';
        text = '<strong>Недавно покупали:</strong> ' + s.coinInfo.name + ' - рекомендация отложена. Цена изменилась только на ' + priceChange.toFixed(1) + '% с последней покупки. Подождите изменения цены минимум на 5% для новой рекомендации DCA.';
        actionHtml = '';
        autoAlert = { enabled: false };
        return { type, badge, text, actionHtml, autoAlert, s };
    }

    const categoryLabel = {
        'fundamental_l1': 'L1 фундаментал',
        'fundamental_l2': 'L2 фундаментал',
        'exchange': 'биржевой токен',
        'dex': 'DEX/инфраструктура',
        'modular': 'модульный/экспериментальный',
        'meme': 'мем-монета',
        'old_lottery': 'старая/лотерейная',
        'other': 'другое'
    } [category] || category;

    const subcategoryLabel = {
        'l1_bluechip': 'bluechip',
        'l1_high_growth': 'high-growth',
        'l1_slow_growth': 'slow-growth',
        'l2_high_growth': 'high-growth',
        'l2_slow_growth': 'slow-growth',
        'exchange_bluechip': 'bluechip',
        'exchange_mid_tier': 'mid-tier',
        'dex_bluechip': 'bluechip',
        'dex_risky': 'рисковый',
        'modular_early_stage': 'early-stage',
        'modular_mature': 'mature',
        'meme_new': 'новая',
        'meme_legacy': 'legacy',
        'old_privacy': 'privacy',
        'old_legacy': 'legacy',
        'other': 'другое'
    } [subcategory] || subcategory;

    const phaseLabel = {
        'accumulation_uptrend': 'накопление (рост)',
        'accumulation_downtrend': 'накопление (падение)',
        'distribution': 'распределение (памп)',
        'panic_selling': 'панические продажи',
        'consolidation': 'консолидация',
        'short_term_rally': 'краткосрочный памп',
        'pullback': 'откат',
        'uncertain': 'неопределенность',
        'macro_uptrend_coin_uptrend': 'макро-рост + рост монеты',
        'macro_downtrend_coin_downtrend': 'макро-падение + падение монеты',
        'rotation_phase': 'ротация капитала'
    } [marketPhase] || marketPhase;

    // Neutral zone: if both scores < 30, HOLD
    if (s.buyScore < 30 && s.sellScore < 30) {
        type = 'hold';
        badge = 'hold';

        let holdReasonText = 'Нейтральная зона: нет выраженных сигналов';
        if (marketPhase === 'consolidation') holdReasonText = 'Консолидация: ждите определения направления';
        if (marketPhase === 'uncertain') holdReasonText = 'Неопределенность на рынке: лучше подождать';

        if (h.targetPrice) {
            autoAlert = { enabled: true, type: 'above', value: h.targetPrice, suggestedAmount: +(h.amount * c.current_price * 0.5).toFixed(2), action: 'sell', symbol: h.symbol };
        } else if (h.stopLoss) {
            autoAlert = { enabled: true, type: 'below', value: h.stopLoss, suggestedAmount: 0, action: 'sell', symbol: h.symbol };
        }

        text = 'Нейтральная зона для <strong>' + s.coinInfo.name + '</strong> (' + categoryLabel + ', ' + riskLevel + ' риск). P&L <strong>' + fmtPct(pnl) + '</strong>, 24ч <strong>' + fmtPct(ch24) + '</strong>. Risk Score: <strong>' + Math.round(riskScore) + '/100</strong>. ' + holdReasonText + '.';

        actionHtml =
            '<div class="advice-action">' +
            '<div class="advice-action-title">Текущая ситуация</div>' +
            '<div class="advice-grid">' +
            '<div class="advice-metric"><div class="advice-metric-value">' + fmt$(val) + '</div><div class="advice-metric-label">текущая стоимость</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value">' + fmt$(inv) + '</div><div class="advice-metric-label">вложено</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value">' + s.weight.toFixed(1) + '%</div><div class="advice-metric-label">вес в портфеле</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value" style="font-size:14px;">' + riskLabel + '</div><div class="advice-metric-label">риск</div></div>' +
            '</div>' +
            '<div class="signal-row">' +
            '<span class="signal-chip yellow">buy score: ' + Math.round(s.buyScore) + '</span>' +
            '<span class="signal-chip yellow">sell score: ' + Math.round(s.sellScore) + '</span>' +
            '<span class="signal-chip blue">' + categoryLabel + '</span>' +
            '<span class="signal-chip purple">' + phaseLabel + '</span>' +
            (h.targetPrice ? '<span class="signal-chip green">цель: ' + fmt$(h.targetPrice) + '</span>' : '') +
            (h.stopLoss ? '<span class="signal-chip red">стоп: ' + fmt$(h.stopLoss) + '</span>' : '') +
            '</div>' +
            '</div>';
    } else if (s.sellScore >= 40 && s.sellScore >= s.buyScore) {
        type = 'sell';
        badge = 'sell';
        const sellStrength = getSignalStrength(s.sellScore);
        let sellPart = 0.3;
        if (s.sellScore >= 70) sellPart = 0.5;
        const stopHit = h.stopLoss && c.current_price <= h.stopLoss;
        const targetReached = h.targetPrice && c.current_price >= h.targetPrice;
        if (stopHit) sellPart = 1;
        const sellQty = h.amount * sellPart;
        const sellValue = sellQty * c.current_price;

        let sellReasonText = '';
        if (marketPhase === 'distribution') {
            sellReasonText = 'Фаза распределения: фиксируйте прибыль на пампе';
        } else if (marketPhase === 'short_term_rally') {
            sellReasonText = 'Краткосрочный памп без фундамента: разумно зафиксировать';
        } else if (rsi > 70) {
            sellReasonText = 'Перекупленность по RSI (' + rsi + '): возможна коррекция';
        } else if (emaTrend === 'downtrend') {
            sellReasonText = 'Смена тренда вниз (EMA): выход из позиции';
        } else if (category === 'meme') {
            sellReasonText = 'Мем-монета: фиксируйте прибыль на пампе, чтобы не потерять gains';
        } else if (category === 'old_lottery') {
            sellReasonText = 'Старая монета: разумно зафиксировать часть прибыли';
        } else if (category === 'fundamental_l1') {
            sellReasonText = 'Фундаментальный актив: можно оставить часть на долгосрок';
        } else {
            sellReasonText = s.reasonsSell.join(', ') || 'фиксация прибыли';
        }

        text = 'Сигнал на продажу <strong>' + s.coinInfo.name + '</strong> (' + categoryLabel + ', ' + riskLevel + ' риск, фаза: ' + phaseLabel + '). P&L <strong>' + fmtPct(pnl) + '</strong>, 24ч <strong>' + fmtPct(ch24) + '</strong>. Risk Score: <strong>' + Math.round(riskScore) + '/100</strong>. RSI: <strong>' + rsi + '</strong>. Причины: <strong>' + sellReasonText + '</strong>.';

        let alertPrice;
        if (targetReached) {
            alertPrice = h.targetPrice;
        } else if (stopHit) {
            alertPrice = h.stopLoss;
        } else {
            if (emaTrend === 'uptrend') {
                alertPrice = +(c.current_price * 1.15).toFixed(4);
            } else if (emaTrend === 'downtrend') {
                alertPrice = +(c.current_price * 0.90).toFixed(4);
            } else {
                alertPrice = +(c.current_price * 0.85).toFixed(4);
            }
        }

        autoAlert = {
            enabled: true,
            type: targetReached ? 'above' : (stopHit ? 'below' : 'above'),
            value: alertPrice,
            suggestedAmount: 0,
            action: 'sell',
            symbol: h.symbol
        };

        actionHtml =
            '<div class="advice-action">' +
            '<div class="advice-action-title">План действий</div>' +
            '<div class="advice-grid">' +
            '<div class="advice-metric"><div class="advice-metric-value">' + sellQty.toFixed(4) + '</div><div class="advice-metric-label">продать ' + h.symbol + (sellPart < 1 ? ' (' + Math.round(sellPart * 100) + '%)' : ' (всё)') + '</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value">' + fmt$(sellValue) + '</div><div class="advice-metric-label">получите</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value">' + Math.round(s.sellScore) + '</div><div class="advice-metric-label">sell score</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value" style="font-size:14px;">' + riskLabel + '</div><div class="advice-metric-label">риск</div></div>' +
            '</div>' +
            '<div class="signal-row">' +
            '<span class="signal-chip red">сила сигнала: ' + sellStrength + '</span>' +
            '<span class="signal-chip yellow">вес в портфеле: ' + s.weight.toFixed(1) + '%</span>' +
            '<span class="signal-chip blue">' + categoryLabel + '</span>' +
            '<span class="signal-chip purple">' + phaseLabel + '</span>' +
            '<span class="signal-chip orange">RSI: ' + rsi + '</span>' +
            (h.targetPrice ? '<span class="signal-chip green">цель: ' + fmt$(h.targetPrice) + '</span>' : '') +
            (h.stopLoss ? '<span class="signal-chip red">стоп: ' + fmt$(h.stopLoss) + '</span>' : '') +
            '</div>' +
            '</div>';
    } else if (s.buyScore >= 40 && s.buyScore > s.sellScore) {
        if (coinInfo.quality === 'garbage') {
            type = 'hold';
            badge = 'hold';
            text = '<strong>⚠️ ВНИМАНИЕ:</strong> ' + s.coinInfo.name + ' - проект низкого качества (мёртвый/умирающий). Не рекомендуется усреднять позицию даже при глубокой просадке. Рассмотрите возможность выхода при отскоке. P&L: ' + fmtPct(pnl) + ', от ATH: ' + (s.hasAth ? fmtPct(drawdown) : 'н/д') + '.';
            actionHtml = '';
            autoAlert = { enabled: false };
        } else if (coinInfo.quality === 'weak') {
            type = 'hold';
            badge = 'hold';
            text = '<strong>⚠️ Осторожно:</strong> ' + s.coinInfo.name + ' - слабый проект без сильного фундамента. Усреднение не рекомендуется. Лучше держать или продать при отскоке. P&L: ' + fmtPct(pnl) + ', от ATH: ' + (s.hasAth ? fmtPct(drawdown) : 'н/д') + '. Если всё равно хотите усреднить - делайте это минимальными суммами.';
            actionHtml = '';
            autoAlert = { enabled: false };
        } else {
            type = 'buy';
            badge = 'buy';
            const buyStrength = getSignalStrength(s.buyScore);

            const isWeakBuy = s.buyScore >= 30 && s.buyScore < 40;

            const dcaPercentage = calculateDCAPercentage(pnl, riskLevel, coinInfo.quality);
            const buyPart = isWeakBuy ? Math.min(dcaPercentage * 0.5, 0.1) : dcaPercentage;

            const suggestedAmount = +(Math.max(10, inv * buyPart)).toFixed(2);
            const buyQty = suggestedAmount / c.current_price;
            const newAvg = (h.amount * h.avgPrice + buyQty * c.current_price) / (h.amount + buyQty);
            const breakEven = ((newAvg - c.current_price) / c.current_price) * 100;

            let alertPrice;
            const alertDrop = riskLevel === 'low' ? 0.05 : (riskLevel === 'medium' ? 0.10 : 0.15);
            alertPrice = +(c.current_price * (1 - alertDrop)).toFixed(4);

            let buyReasonText = '';
            if (isWeakBuy) {
                buyReasonText = 'Слабый сигнал: небольшая докупка';
            } else if (marketPhase === 'accumulation_downtrend') {
                buyReasonText = 'Фаза накопления после падения: отличная точка входа';
            } else if (marketPhase === 'pullback') {
                buyReasonText = 'Откат в восходящем тренде: хороший момент для докупки';
            } else if (marketPhase === 'consolidation') {
                buyReasonText = 'Консолидация: можно усреднить позицию';
            } else if (rsi < 30) {
                buyReasonText = 'Перепроданность (RSI ' + rsi + '): сильный сигнал покупки';
            } else if (emaTrend === 'uptrend') {
                buyReasonText = 'Восходящий тренд (EMA): докупка в тренде';
            } else if (category === 'fundamental_l1') {
                buyReasonText = 'Фундаментальный L1: отличная возможность усреднить позицию';
            } else if (category === 'meme') {
                buyReasonText = 'Мем-монета: высокая волатильность, входите осторожно';
            } else if (riskLevel === 'high') {
                buyReasonText = 'Высокий риск: умеренная докупка при глубокой просадке';
            } else {
                buyReasonText = s.reasonsBuy.join(', ') || 'подходит для DCA';
            }

            text = (isWeakBuy ? 'Слабый сигнал на покупку' : 'Сигнал на покупку') + ' <strong>' + s.coinInfo.name + '</strong> (' + categoryLabel + ', ' + riskLevel + ' риск, фаза: ' + phaseLabel + '). P&L <strong>' + fmtPct(pnl) + '</strong>, 24ч <strong>' + fmtPct(ch24) + '</strong>' + (s.hasAth ? (', от ATH <strong>' + fmtPct(drawdown) + '</strong>') : '') + '. Risk Score: <strong>' + Math.round(riskScore) + '/100</strong>. RSI: <strong>' + rsi + '</strong>. Причины: <strong>' + buyReasonText + '</strong>. Рекомендуемая докупка: <strong>' + Math.round(buyPart * 100) + '%</strong> от позиции.';

            autoAlert = {
                enabled: true,
                type: 'below',
                value: alertPrice,
                suggestedAmount: suggestedAmount,
                action: 'buy',
                symbol: h.symbol
            };

            actionHtml =
                '<div class="advice-action">' +
                '<div class="advice-action-title">План докупки</div>' +
                '<div class="advice-grid">' +
                '<div class="advice-metric"><div class="advice-metric-value">' + fmt$(suggestedAmount) + '</div><div class="advice-metric-label">докупить на</div></div>' +
                '<div class="advice-metric"><div class="advice-metric-value">' + buyQty.toFixed(4) + '</div><div class="advice-metric-label">получите ' + h.symbol + '</div></div>' +
                '<div class="advice-metric"><div class="advice-metric-value" style="font-size:14px;">$' + h.avgPrice + ' → $' + newAvg.toFixed(2) + '</div><div class="advice-metric-label">новая средняя</div></div>' +
                '<div class="advice-metric"><div class="advice-metric-value">+' + breakEven.toFixed(1) + '%</div><div class="advice-metric-label">рост до окупа</div></div>' +
                '</div>' +
                '<div class="signal-row">' +
                '<span class="signal-chip green">сила сигнала: ' + buyStrength + '</span>' +
                '<span class="signal-chip green">buy score: ' + Math.round(s.buyScore) + '</span>' +
                '<span class="signal-chip yellow">вес в портфеле: ' + s.weight.toFixed(1) + '%</span>' +
                '<span class="signal-chip blue">' + categoryLabel + '</span>' +
                '<span class="signal-chip purple">' + phaseLabel + '</span>' +
                '<span class="signal-chip orange">RSI: ' + rsi + '</span>' +
                '<span class="signal-chip yellow">' + riskLabel + '</span>' +
                '</div>' +
                '</div>';
        }
    } else {
        type = 'hold';
        badge = 'hold';

        let holdReasonText = '';
        if (marketPhase === 'accumulation_uptrend') {
            holdReasonText = 'Фаза накопления в восходящем тренде: держите для роста';
        } else if (marketPhase === 'consolidation') {
            holdReasonText = 'Консолидация: ждите определения направления';
        } else if (marketPhase === 'uncertain') {
            holdReasonText = 'Неопределенность на рынке: лучше подождать';
        } else if (category === 'fundamental_l1' && pnl > -20) {
            holdReasonText = 'Фундаментальный L1: долгосрочная перспектива';
        } else if (riskLevel === 'low') {
            holdReasonText = 'Низкий риск: можно держать';
        } else if (s.weight < 1) {
            holdReasonText = 'Малый вес в портфеле: не SELL';
        } else {
            holdReasonText = 'Выраженного сигнала нет';
        }

        if (h.targetPrice) {
            autoAlert = { enabled: true, type: 'above', value: h.targetPrice, suggestedAmount: +(h.amount * c.current_price * 0.5).toFixed(2), action: 'sell', symbol: h.symbol };
        } else if (h.stopLoss) {
            autoAlert = { enabled: true, type: 'below', value: h.stopLoss, suggestedAmount: 0, action: 'sell', symbol: h.symbol };
        }

        text = 'Рекомендация: держать <strong>' + s.coinInfo.name + '</strong> (' + categoryLabel + ', ' + riskLevel + ' риск, фаза: ' + phaseLabel + '). P&L <strong>' + fmtPct(pnl) + '</strong>, 24ч <strong>' + fmtPct(ch24) + '</strong>' + (s.hasAth ? (', от ATH <strong>' + fmtPct(drawdown) + '</strong>') : '') + '. Risk Score: <strong>' + Math.round(riskScore) + '/100</strong>. RSI: <strong>' + rsi + '</strong>. ' + holdReasonText + '.';

        actionHtml =
            '<div class="advice-action">' +
            '<div class="advice-action-title">Текущая ситуация</div>' +
            '<div class="advice-grid">' +
            '<div class="advice-metric"><div class="advice-metric-value">' + fmt$(val) + '</div><div class="advice-metric-label">текущая стоимость</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value">' + fmt$(inv) + '</div><div class="advice-metric-label">вложено</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value">' + s.weight.toFixed(1) + '%</div><div class="advice-metric-label">вес в портфеле</div></div>' +
            '<div class="advice-metric"><div class="advice-metric-value" style="font-size:14px;">' + riskLabel + '</div><div class="advice-metric-label">риск</div></div>' +
            '</div>' +
            '<div class="signal-row">' +
            '<span class="signal-chip yellow">buy score: ' + Math.round(s.buyScore) + '</span>' +
            '<span class="signal-chip yellow">sell score: ' + Math.round(s.sellScore) + '</span>' +
            '<span class="signal-chip blue">' + categoryLabel + '</span>' +
            '<span class="signal-chip purple">' + phaseLabel + '</span>' +
            '<span class="signal-chip orange">RSI: ' + rsi + '</span>' +
            (h.targetPrice ? '<span class="signal-chip green">цель: ' + fmt$(h.targetPrice) + '</span>' : '') +
            (h.stopLoss ? '<span class="signal-chip red">стоп: ' + fmt$(h.stopLoss) + '</span>' : '') +
            '</div>' +
            '</div>';
    }

    if (h.notes) {
        text += '<div style="margin-top:8px;padding:8px;background:rgba(59,130,246,0.08);border-radius:6px;font-size:12px;color:var(--text-3);border-left:2px solid var(--blue)">Ваша заметка: ' + h.notes + '</div>';
    }

    return { type, badge, text, actionHtml, autoAlert };
}

function getAdviceScores(h, c) {
    const pnl = h.avgPrice > 0 ? ((c.current_price - h.avgPrice) / h.avgPrice) * 100 : 0;
    const hasAth = typeof c.ath === 'number' && c.ath > 0;
    const drawdown = hasAth ? ((c.current_price - c.ath) / c.ath) * 100 : 0;
    const ch24 = c.price_change_percentage_24h || 0;
    const ch7 = c.price_change_percentage_7d_in_currency || 0;
    const ch30 = c.price_change_percentage_30d_in_currency || 0;
    const fear = fearData && fearData.data && fearData.data[0] ? parseInt(fearData.data[0].value) : 50;

    const portfolioValue = getPortfolioValue();
    const coinValue = h.amount * c.current_price;
    const weight = portfolioValue > 0 ? (coinValue / portfolioValue) * 100 : 0;

    const coinInfo = getCoinInfo(h.symbol, c);
    const riskLevel = coinInfo.risk;
    const category = coinInfo.category;
    const subcategory = coinInfo.subcategory;

    const volatility = calculateVolatility(c);
    const volumeRisk = calculateVolumeRisk(c);
    const rsi = calculateRSI(c);
    const emaTrend = calculateEMATrend(c);
    const btcTrend = getBTCTrend();
    const riskScore = calculateRiskScore(c, coinInfo, volatility, volumeRisk, btcTrend);
    const marketPhase = determineMarketPhase(c, ch24, ch7, ch30, btcTrend);

    const metrics = {
        pnl,
        drawdown,
        hasAth,
        ch24,
        ch7,
        ch30,
        fear,
        weight,
        riskLevel,
        category,
        subcategory,
        marketPhase,
        rsi,
        emaTrend,
        volumeRisk,
        volatility,
        riskScore,
        btcTrend,
        coinInfo
    };

    const buyResult = scoreBuy(h, c, metrics);
    const sellResult = scoreSell(h, c, metrics);
    const riskResult = scoreRisk(h, c, { ...metrics, buyScore: buyResult.buyScore, sellScore: sellResult.sellScore });

    const buyScore = buyResult.buyScore + riskResult.buyScore;
    const sellScore = sellResult.sellScore + riskResult.sellScore;
    const reasonsBuy = [...buyResult.reasonsBuy, ...riskResult.reasonsBuy];
    const reasonsSell = [...sellResult.reasonsSell, ...riskResult.reasonsSell];

    return {
        buyScore,
        sellScore,
        pnl,
        drawdown,
        hasAth,
        ch24,
        ch7,
        ch30,
        fear,
        weight,
        reasonsBuy,
        reasonsSell,
        coinInfo,
        riskLevel,
        category,
        subcategory,
        volatility,
        volumeRisk,
        riskScore,
        marketPhase,
        rsi,
        emaTrend,
        btcTrend
    };
}

function getSignalStrength(score) {
    if (score >= 70) return 'strong';
    if (score >= 45) return 'medium';
    return 'weak';
}

function getRiskLabel(s) {
    if (s.weight > 35 || Math.abs(s.ch24) > 15) return 'высокий риск';
    if (s.weight > 20 || Math.abs(s.ch24) > 8) return 'средний риск';
    return 'низкий риск';
}

function scoreBuy(h, c, metrics) {
    const { pnl, drawdown, hasAth, ch24, ch7, fear, weight, riskLevel, category, subcategory, marketPhase, rsi, emaTrend } = metrics;
    let buyScore = 0;
    const reasonsBuy = [];

    const dropMultiplier = riskLevel === 'high' ? 1.3 : (riskLevel === 'low' ? 0.8 : 1.0);

    if (pnl < -40) { buyScore += Math.round(30 * dropMultiplier);
        reasonsBuy.push('глубокая просадка ' + fmtPct(pnl)); }
    if (pnl < -60) { buyScore += Math.round(20 * dropMultiplier);
        reasonsBuy.push('экстремальный убыток'); }
    if (hasAth && drawdown < -70) { buyScore += Math.round(20 * dropMultiplier);
        reasonsBuy.push('от ATH ' + fmtPct(drawdown)); }
    if (hasAth && drawdown < -85) { buyScore += Math.round(15 * dropMultiplier);
        reasonsBuy.push('цена у исторического дна'); }
    if (pnl < -40 && ch24 > 3) { buyScore += 15;
        reasonsBuy.push('появился отскок +' + ch24.toFixed(1) + '% за 24ч'); }

    if (ch24 < -15) { buyScore += 10;
        reasonsBuy.push('капитуляция -15% за 24ч'); }

    if (rsi < 30) { buyScore += 15;
        reasonsBuy.push('перепроданность (RSI ' + rsi + ')'); }
    if (rsi < 35) { buyScore += 8;
        reasonsBuy.push('низкий RSI (' + rsi + ')'); }

    if (emaTrend === 'strong_uptrend') { buyScore += 12;
        reasonsBuy.push('сильный восходящий тренд (EMA)'); }
    if (emaTrend === 'uptrend') { buyScore += 8;
        reasonsBuy.push('восходящий тренд (EMA)'); }

    if (marketPhase === 'accumulation_downtrend') { buyScore += 15;
        reasonsBuy.push('фаза накопления после падения'); }
    if (marketPhase === 'pullback') { buyScore += 10;
        reasonsBuy.push('откат в восходящем тренде'); }
    if (marketPhase === 'consolidation' && pnl < -10) { buyScore += 8;
        reasonsBuy.push('консолидация с просадкой'); }
    if (marketPhase === 'macro_uptrend_coin_uptrend' && category === 'fundamental_l1') {
        buyScore += 10;
        reasonsBuy.push('макро-тренд вверх: BUY фундаментальные');
    }
    if (marketPhase === 'rotation_phase' && category === 'fundamental_l1') {
        buyScore += 8;
        reasonsBuy.push('ротация капитала: фундаментальные недооценены');
    }

    if (ch7 < -15) { buyScore += 5;
        reasonsBuy.push('слабая неделя'); }
    if (fear < 30) { buyScore += 10;
        reasonsBuy.push('рынок в страхе (' + fear + ')'); }

    if (category === 'fundamental_l1' && drawdown < -50) {
        buyScore += 10;
        reasonsBuy.push('фундаментальный L1 с глубокой просадкой');
    }
    if (category === 'fundamental_l2' && drawdown < -40) {
        buyScore += 8;
        reasonsBuy.push('фундаментальный L2 с просадкой');
    }
    if (subcategory === 'l1_high_growth' && drawdown < -30) {
        buyScore += 8;
        reasonsBuy.push('L1 high-growth с просадкой');
    }

    if (weight > 35) { buyScore -= 20;
        reasonsBuy.push('позиция уже ' + weight.toFixed(0) + '% портфеля — докупать осторожно'); } else if (weight > 25) { buyScore -= 10; } else if (weight < 1 && category !== 'meme') { buyScore += 5;
        reasonsBuy.push('малый вес в портфеле — можно увеличить'); }

    return { buyScore, reasonsBuy };
}

function scoreSell(h, c, metrics) {
    const { pnl, ch24, weight, riskLevel, category, subcategory, marketPhase, rsi, emaTrend, volumeRisk } = metrics;
    let sellScore = 0;
    const reasonsSell = [];

    if (pnl > 50) { sellScore += 25;
        reasonsSell.push('прибыль ' + fmtPct(pnl)); }
    if (pnl > 100) { sellScore += 25;
        reasonsSell.push('прибыль больше x2'); }
    if (pnl > 200) { sellScore += 20;
        reasonsSell.push('экстремальная прибыль >200%'); }

    if (rsi > 70) { sellScore += 15;
        reasonsSell.push('перекупленность (RSI ' + rsi + ')'); }
    if (rsi > 65) { sellScore += 8;
        reasonsSell.push('высокий RSI (' + rsi + ')'); }

    if (emaTrend === 'strong_downtrend') { sellScore += 12;
        reasonsSell.push('смена тренда вниз (EMA)'); }
    if (emaTrend === 'downtrend') { sellScore += 8;
        reasonsSell.push('нисходящий тренд (EMA)'); }

    if (marketPhase === 'distribution') { sellScore += 15;
        reasonsSell.push('фаза распределения (памп)'); }
    if (marketPhase === 'short_term_rally') { sellScore += 10;
        reasonsSell.push('краткосрочный памп без фундамента'); }
    if (marketPhase === 'macro_downtrend_coin_uptrend' && riskLevel === 'high') {
        sellScore += 15;
        reasonsSell.push('макро-тренд вниз: SELL high-risk');
    }

    if (ch24 > 15) { sellScore += 15;
        reasonsSell.push('резкий рост +' + ch24.toFixed(1) + '% за 24ч'); }
    if (ch24 > 25) { sellScore += 10;
        reasonsSell.push('экстремальный памп'); }

    if (ch24 > 10 && volumeRisk === 'low') { sellScore += 10;
        reasonsSell.push('памп при падении объёмов'); }

    if (category === 'meme' && ch24 > 20) {
        sellScore += 20;
        reasonsSell.push('мем-монета: фиксируйте памп');
    }
    if (category === 'meme' && pnl > 50) {
        sellScore += 15;
        reasonsSell.push('мем-монета в прибыли: фиксируйте gains');
    }
    if (category === 'old_lottery' && pnl > 30) {
        sellScore += 15;
        reasonsSell.push('старая монета: разумно зафиксировать');
    }
    if (category === 'modular' && pnl > 100) {
        sellScore += 10;
        reasonsSell.push('экспериментальная монета: частичная фиксация');
    }
    if (subcategory === 'dex_risky' && pnl > 40) {
        sellScore += 10;
        reasonsSell.push('рисковый DEX: фиксация');
    }

    if (h.targetPrice && c.current_price >= h.targetPrice) { sellScore += 40;
        reasonsSell.push('достигнута цель ' + fmt$(h.targetPrice)); }
    if (h.stopLoss && c.current_price <= h.stopLoss) { sellScore += 50;
        reasonsSell.push('сработал стоп-лосс ' + fmt$(h.stopLoss)); }

    if (metrics.fear > 75) { sellScore += 10;
        reasonsSell.push('рынок в жадности (' + metrics.fear + ')'); }

    if (weight > 20) { sellScore += 15;
        reasonsSell.push('перевес позиции (' + weight.toFixed(0) + '%) — ребалансировка'); }
    if (weight > 35) { sellScore += 20;
        reasonsSell.push('чрезмерный вес (' + weight.toFixed(0) + '%) — продать часть'); }

    return { sellScore, reasonsSell };
}

function scoreRisk(h, c, metrics) {
    const { volumeRisk, pnl, category, emaTrend } = metrics;
    let buyScore = metrics.buyScore || 0;
    let sellScore = metrics.sellScore || 0;
    const reasonsBuy = [];
    const reasonsSell = [];

    if (volumeRisk === 'very_low') {
        buyScore -= 10;
        reasonsBuy.push('очень низкая ликвидность');
    }
    if (volumeRisk === 'very_low' && pnl > 20) {
        sellScore += 15;
        reasonsSell.push('низкая ликвидность с прибылью');
    }

    if (category === 'fundamental_l1' && emaTrend === 'uptrend' && pnl > 0 && pnl < 100) {
        sellScore -= 15;
        reasonsBuy.push('фундаментальный L1 в тренде: HOLD');
    }

    return { buyScore, sellScore, reasonsBuy, reasonsSell };
}

function calculateDCAPercentage(dropPct, riskLevel, quality = 'medium') {
    const absDrop = Math.abs(dropPct);

    const qualityMultipliers = {
        'strong': 1.0,
        'medium': 0.6,
        'weak': 0.3,
        'garbage': 0.0
    };

    const qualityMultiplier = qualityMultipliers[quality] || 0.6;

    const riskMultipliers = {
        'low': 1.2,
        'medium': 1.0,
        'high': 0.7
    };

    const riskMultiplier = riskMultipliers[riskLevel] || 1.0;

    const totalMultiplier = qualityMultiplier * riskMultiplier;

    if (absDrop >= 90) return Math.min(0.25, 0.25 * totalMultiplier);
    if (absDrop >= 70) return Math.min(0.20, 0.20 * totalMultiplier);
    if (absDrop >= 50) return Math.min(0.15, 0.15 * totalMultiplier);
    if (absDrop >= 40) return Math.min(0.12, 0.12 * totalMultiplier);
    if (absDrop >= 30) return Math.min(0.10, 0.10 * totalMultiplier);
    if (absDrop >= 20) return Math.min(0.08, 0.08 * totalMultiplier);
    if (absDrop >= 10) return Math.min(0.05, 0.05 * totalMultiplier);
    return 0.02;
}

function shouldSkipRecommendation(h, c, type) {
    const lastAction = recentUserActions.get(h.id);
    if (!lastAction) return false;

    const hoursSinceAction = (Date.now() - lastAction.timestamp) / (1000 * 60 * 60);
    const coinInfo = getCoinInfo(h.symbol, c);

    if (hoursSinceAction < 24) return true;

    if (type === 'sell' && lastAction.action === 'sell' && coinInfo.quality === 'strong') {
        if (hoursSinceAction < 168) return true;
    }

    if (type === 'buy' && lastAction.action === 'buy') {
        const priceChange = Math.abs((c.current_price - lastAction.price) / lastAction.price) * 100;
        if (priceChange < 5) return true;
    }

    return false;
}

function recordUserAction(holdingId, action, price, amount) {
    recentUserActions.set(holdingId, {
        action,
        timestamp: Date.now(),
        price,
        amount
    });
    lastSentNotifications.delete(holdingId);
}

function shouldSendNotification(holdingId, type, badge, buyScore, sellScore, currentPrice) {
    const lastNotif = lastSentNotifications.get(holdingId);
    if (!lastNotif) return true;

    const typeChanged = lastNotif.type !== type;
    const badgeChanged = lastNotif.badge !== badge;
    const buyScoreChanged = Math.abs(lastNotif.buyScore - buyScore) > 10;
    const sellScoreChanged = Math.abs(lastNotif.sellScore - sellScore) > 10;
    const priceChanged = Math.abs((currentPrice - lastNotif.price) / lastNotif.price) > 0.05;

    return typeChanged || badgeChanged || buyScoreChanged || sellScoreChanged || priceChanged;
}

function recordNotificationState(holdingId, type, badge, buyScore, sellScore, currentPrice) {
    lastSentNotifications.set(holdingId, {
        type,
        badge,
        buyScore,
        sellScore,
        price: currentPrice,
        timestamp: Date.now()
    });
}

// ============================================================
// КАТЕГОРИИ И КЛАССИФИКАЦИЯ МОНЕТ
// ============================================================

const coinCategories = {
    'btc': { category: 'fundamental_l1', subcategory: 'l1_bluechip', risk: 'low', quality: 'strong', name: 'Bitcoin', btcCorrelation: 1.0 },
    'eth': { category: 'fundamental_l1', subcategory: 'l1_bluechip', risk: 'low', quality: 'strong', name: 'Ethereum', btcCorrelation: 0.85 },
    'sol': { category: 'fundamental_l1', subcategory: 'l1_high_growth', risk: 'medium', quality: 'strong', name: 'Solana', btcCorrelation: 0.75 },
    'near': { category: 'fundamental_l1', subcategory: 'l1_high_growth', risk: 'medium', quality: 'strong', name: 'NEAR', btcCorrelation: 0.7 },
    'sei': { category: 'fundamental_l1', subcategory: 'l1_high_growth', risk: 'medium', quality: 'strong', name: 'Sei', btcCorrelation: 0.65 },
    'ada': { category: 'fundamental_l1', subcategory: 'l1_slow_growth', risk: 'low', quality: 'medium', name: 'Cardano', btcCorrelation: 0.8 },
    'dot': { category: 'fundamental_l1', subcategory: 'l1_slow_growth', risk: 'low', quality: 'medium', name: 'Polkadot', btcCorrelation: 0.75 },
    'atom': { category: 'fundamental_l1', subcategory: 'l1_slow_growth', risk: 'low', quality: 'medium', name: 'Cosmos', btcCorrelation: 0.7 },
    'arb': { category: 'fundamental_l2', subcategory: 'l2_high_growth', risk: 'medium', quality: 'strong', name: 'Arbitrum', btcCorrelation: 0.8 },
    'mnt': { category: 'fundamental_l2', subcategory: 'l2_high_growth', risk: 'medium', quality: 'medium', name: 'Mantle', btcCorrelation: 0.7 },
    'pol': { category: 'fundamental_l2', subcategory: 'l2_slow_growth', risk: 'low', quality: 'medium', name: 'Polygon', btcCorrelation: 0.85 },
    'bnb': { category: 'exchange', subcategory: 'exchange_bluechip', risk: 'low', quality: 'strong', name: 'BNB', btcCorrelation: 0.7 },
    'bgb': { category: 'exchange', subcategory: 'exchange_mid_tier', risk: 'medium', quality: 'medium', name: 'Bitget', btcCorrelation: 0.6 },
    'uni': { category: 'dex', subcategory: 'dex_bluechip', risk: 'medium', quality: 'strong', name: 'Uniswap', btcCorrelation: 0.75 },
    'gmx': { category: 'dex', subcategory: 'dex_bluechip', risk: 'medium', quality: 'medium', name: 'GMX', btcCorrelation: 0.65 },
    '1inch': { category: 'dex', subcategory: 'dex_risky', risk: 'medium', quality: 'medium', name: '1inch', btcCorrelation: 0.6 },
    'tia': { category: 'modular', subcategory: 'modular_early_stage', risk: 'high', quality: 'strong', name: 'Celestia', btcCorrelation: 0.55 },
    'dym': { category: 'modular', subcategory: 'modular_early_stage', risk: 'high', quality: 'strong', name: 'Dymension', btcCorrelation: 0.5 },
    'gram': { category: 'modular', subcategory: 'modular_mature', risk: 'high', quality: 'medium', name: 'TON', btcCorrelation: 0.4 },
    'dogs': { category: 'meme', subcategory: 'meme_new', risk: 'high', quality: 'weak', name: 'Dogs', btcCorrelation: 0.3 },
    'not': { category: 'meme', subcategory: 'meme_new', risk: 'high', quality: 'weak', name: 'Notcoin', btcCorrelation: 0.3 },
    'doge': { category: 'meme', subcategory: 'meme_legacy', risk: 'high', quality: 'weak', name: 'Dogecoin', btcCorrelation: 0.5 },
    'shib': { category: 'meme', subcategory: 'meme_legacy', risk: 'high', quality: 'weak', name: 'Shiba Inu', btcCorrelation: 0.45 },
    'zec': { category: 'old_lottery', subcategory: 'old_privacy', risk: 'high', quality: 'weak', name: 'Zcash', btcCorrelation: 0.6 },
    'dash': { category: 'old_lottery', subcategory: 'old_privacy', risk: 'high', quality: 'weak', name: 'Dash', btcCorrelation: 0.55 },
    'ltc': { category: 'old_lottery', subcategory: 'old_legacy', risk: 'medium', quality: 'weak', name: 'Litecoin', btcCorrelation: 0.9 },
    'osmo': { category: 'dead', subcategory: 'dead_defi', risk: 'high', quality: 'garbage', name: 'Osmosis', btcCorrelation: 0.5 },
    'zen': { category: 'dead', subcategory: 'dead_privacy', risk: 'high', quality: 'garbage', name: 'Horizen', btcCorrelation: 0.4 },
    'algo': { category: 'dead', subcategory: 'dead_l1', risk: 'high', quality: 'weak', name: 'Algorand', btcCorrelation: 0.6 },
    'pengu': { category: 'meme', subcategory: 'meme_new', risk: 'high', quality: 'garbage', name: 'Pudgy Penguins', btcCorrelation: 0.3 }
};

function getCoinInfo(symbol, coinData = null) {
    const sym = symbol.toLowerCase();

    if (coinCategories[sym]) {
        return coinCategories[sym];
    }

    if (coinData) {
        return classifyNewCoin(coinData);
    }

    return { category: 'other', subcategory: 'other', risk: 'medium', quality: 'medium', name: symbol, btcCorrelation: 0.5 };
}

function classifyNewCoin(c) {
    const mcap = c.market_cap || 0;
    const volume = c.total_volume || 0;
    const categories = c.categories || [];
    const symbol = c.symbol?.toLowerCase() || '';
    const genesisDate = c.genesis_date || c.atl_date;

    let qualityFromMcap = 'medium';
    if (mcap > 5000000000) qualityFromMcap = 'strong';
    else if (mcap > 500000000) qualityFromMcap = 'medium';
    else if (mcap > 50000000) qualityFromMcap = 'weak';
    else qualityFromMcap = 'garbage';

    let qualityFromVolume = 'medium';
    if (volume > 500000000) qualityFromVolume = 'strong';
    else if (volume > 50000000) qualityFromVolume = 'medium';
    else if (volume > 5000000) qualityFromVolume = 'weak';
    else qualityFromVolume = 'garbage';

    let qualityFromAge = 'medium';
    if (genesisDate) {
        const ageInMonths = (Date.now() - new Date(genesisDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
        if (ageInMonths > 24) qualityFromAge = 'strong';
        else if (ageInMonths > 6) qualityFromAge = 'medium';
        else qualityFromAge = 'weak';
    }

    let qualityFromTokenomics = 'medium';
    const circulatingSupply = c.circulating_supply || 0;
    const totalSupply = c.total_supply || 0;
    const maxSupply = c.max_supply || 0;

    if (maxSupply > 0 && circulatingSupply > 0) {
        const circulationRatio = circulatingSupply / maxSupply;
        if (circulationRatio > 0.9) qualityFromTokenomics = 'weak';
        else if (circulationRatio < 0.2) qualityFromTokenomics = 'weak';
        else qualityFromTokenomics = 'medium';
    }

    let detectedCategory = 'other';
    let detectedSubcategory = 'other';
    let categoryRisk = 'medium';
    let categoryQuality = 'medium';

    const categoriesLower = categories.map(cat => cat.toLowerCase());

    if (categoriesLower.some(cat => cat.includes('layer 1') || cat.includes('smart contract') || cat.includes('proof of stake') || cat.includes('proof of work'))) {
        detectedCategory = 'fundamental_l1';
        detectedSubcategory = 'l1_bluechip';
        categoryRisk = 'low';
        categoryQuality = 'medium';
    } else if (categoriesLower.some(cat => cat.includes('layer 2') || cat.includes('scaling') || cat.includes('rollup'))) {
        detectedCategory = 'fundamental_l2';
        detectedSubcategory = 'l2_high_growth';
        categoryRisk = 'medium';
        categoryQuality = 'medium';
    } else if (categoriesLower.some(cat => cat.includes('decentralized exchange') || cat.includes('dex') || cat.includes('amm'))) {
        detectedCategory = 'dex';
        detectedSubcategory = 'dex_bluechip';
        categoryRisk = 'medium';
        categoryQuality = 'medium';
    } else if (categoriesLower.some(cat => cat.includes('defi') || cat.includes('yield') || cat.includes('lending'))) {
        detectedCategory = 'defi';
        detectedSubcategory = 'defi_protocol';
        categoryRisk = 'medium';
        categoryQuality = 'medium';
    } else if (categoriesLower.some(cat => cat.includes('meme') || cat.includes('dog') || cat.includes('frog') || cat.includes('pepe'))) {
        detectedCategory = 'meme';
        detectedSubcategory = 'meme_new';
        categoryRisk = 'high';
        categoryQuality = 'weak';
    } else if (categoriesLower.some(cat => cat.includes('privacy') || cat.includes('anonymous'))) {
        detectedCategory = 'old_lottery';
        detectedSubcategory = 'old_privacy';
        categoryRisk = 'high';
        categoryQuality = 'weak';
    } else if (categoriesLower.some(cat => cat.includes('interoperability') || cat.includes('oracle') || cat.includes('modular'))) {
        detectedCategory = 'modular';
        detectedSubcategory = 'modular_early_stage';
        categoryRisk = 'high';
        categoryQuality = 'medium';
    } else if (categoriesLower.some(cat => cat.includes('exchange') || cat.includes('cex'))) {
        detectedCategory = 'exchange';
        detectedSubcategory = 'exchange_mid_tier';
        categoryRisk = 'medium';
        categoryQuality = 'medium';
    }

    const qualityScores = { strong: 3, medium: 2, weak: 1, garbage: 0 };
    const totalScore = qualityScores[qualityFromMcap] + qualityScores[qualityFromVolume] + qualityScores[categoryQuality] + (genesisDate ? qualityScores[qualityFromAge] : 2) + qualityScores[qualityFromTokenomics];
    const avgScore = totalScore / (genesisDate ? 5 : 4);

    let finalQuality = 'medium';
    if (avgScore >= 2.5) finalQuality = 'strong';
    else if (avgScore >= 1.5) finalQuality = 'medium';
    else if (avgScore >= 0.5) finalQuality = 'weak';
    else finalQuality = 'garbage';

    let finalRisk = categoryRisk;
    if (finalQuality === 'garbage') finalRisk = 'high';
    else if (finalQuality === 'weak' && finalRisk === 'low') finalRisk = 'medium';

    let btcCorrelation = 0.5;
    if (detectedCategory === 'fundamental_l1') btcCorrelation = 0.75;
    else if (detectedCategory === 'fundamental_l2') btcCorrelation = 0.8;
    else if (detectedCategory === 'meme') btcCorrelation = 0.3;
    else if (detectedCategory === 'old_lottery') btcCorrelation = 0.6;
    else if (detectedCategory === 'modular') btcCorrelation = 0.5;

    return {
        category: detectedCategory,
        subcategory: detectedSubcategory,
        risk: finalRisk,
        quality: finalQuality,
        name: c.name || symbol,
        btcCorrelation: btcCorrelation,
        autoClassified: true
    };
}

function calculateVolatility(c) {
    const ch24 = Math.abs(c.price_change_percentage_24h || 0);
    const ch7 = Math.abs(c.price_change_percentage_7d_in_currency || 0);
    const ch30 = Math.abs(c.price_change_percentage_30d_in_currency || 0);

    const avgDailyVol = (ch24 + (ch7 / 7) + (ch30 / 30)) / 3;
    return avgDailyVol;
}

function calculateVolumeRisk(c) {
    const vol24 = c.total_volume || 0;
    const mcap = c.market_cap || 1;

    const volRatio = vol24 / mcap;

    if (volRatio < 0.01) return 'very_low';
    if (volRatio < 0.05) return 'low';
    if (volRatio < 0.15) return 'medium';
    return 'high';
}

function calculateRSI(c, period = 14) {
    const sparkline7d = c.sparkline_in_7d?.price;
    const sparkline30d = c.sparkline_in_30d?.price;

    const prices = sparkline30d || sparkline7d;

    if (prices && prices.length >= period) {
        let gains = 0;
        let losses = 0;

        for (let i = prices.length - period; i < prices.length; i++) {
            const change = prices[i] - prices[i - 1];
            if (change > 0) {
                gains += change;
            } else {
                losses -= change;
            }
        }

        const avgGain = gains / period;
        const avgLoss = losses / period;

        if (avgLoss === 0) return 100;
        const rs = avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + rs));

        return Math.round(rsi);
    }

    const ch24 = c.price_change_percentage_24h || 0;
    const ch7 = c.price_change_percentage_7d_in_currency || 0;

    if (ch24 > 10 && ch7 > 20) return 75;
    if (ch24 > 5 && ch7 > 10) return 65;
    if (ch24 < -10 && ch7 < -20) return 25;
    if (ch24 < -5 && ch7 < -10) return 35;

    return 50;
}

function calculateEMA(c, period = 7) {
    const sparkline7d = c.sparkline_in_7d?.price;
    const sparkline30d = c.sparkline_in_30d?.price;

    const prices = sparkline30d || sparkline7d;

    if (prices && prices.length >= period) {
        const multiplier = 2 / (period + 1);
        let ema = prices[0];

        for (let i = 1; i < prices.length; i++) {
            ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
        }

        return ema;
    }

    return c.current_price;
}

function calculateEMATrend(c) {
    const ema7 = calculateEMA(c, 7);
    const ema20 = calculateEMA(c, 20);
    const currentPrice = c.current_price;

    if (!ema7 || !ema20) {
        const ch7 = c.price_change_percentage_7d_in_currency || 0;
        const ch30 = c.price_change_percentage_30d_in_currency || 0;

        if (ch7 > 0 && ch30 > 0 && ch7 > ch30) return 'strong_uptrend';
        if (ch7 > 0 && ch30 > 0) return 'uptrend';
        if (ch7 < 0 && ch30 < 0 && ch7 < ch30) return 'strong_downtrend';
        if (ch7 < 0 && ch30 < 0) return 'downtrend';
        if (Math.abs(ch7) < 5 && Math.abs(ch30) < 10) return 'sideways';

        return 'mixed';
    }

    const ema7AboveEma20 = ema7 > ema20;
    const priceAboveEma7 = currentPrice > ema7;

    if (ema7AboveEma20 && priceAboveEma7) return 'strong_uptrend';
    if (ema7AboveEma20) return 'uptrend';
    if (!ema7AboveEma20 && !priceAboveEma7) return 'strong_downtrend';
    if (!ema7AboveEma20) return 'downtrend';

    return 'sideways';
}

function getBTCTrend() {
    const btc = allCoins.find(c => c.id === 'bitcoin' || c.symbol === 'BTC');
    if (!btc) return 'neutral';

    const btcCh24 = btc.price_change_percentage_24h || 0;
    const btcCh7 = btc.price_change_percentage_7d_in_currency || 0;

    if (btcCh24 > 3 && btcCh7 > 10) return 'macro_uptrend';
    if (btcCh24 < -3 && btcCh7 < -10) return 'macro_downtrend';
    if (Math.abs(btcCh24) < 2 && Math.abs(btcCh7) < 5) return 'macro_sideways';

    return 'neutral';
}

function calculateRiskScore(c, coinInfo, volatility, volumeRisk, btcTrend) {
    let score = 0;

    const categoryRisk = {
        'fundamental_l1': 20,
        'fundamental_l2': 30,
        'exchange': 25,
        'dex': 40,
        'modular': 60,
        'meme': 80,
        'old_lottery': 50,
        'other': 40
    };
    score += categoryRisk[coinInfo.category] || 40;

    score += Math.min(volatility * 2, 30);

    const volumeRiskScore = {
        'very_low': 20,
        'low': 10,
        'medium': 0,
        'high': -5
    };
    score += volumeRiskScore[volumeRisk] || 0;

    const btcCorr = coinInfo.btcCorrelation || 0.5;
    if (btcCorr < 0.4) score += 15;
    else if (btcCorr > 0.8) score -= 10;

    const hasAth = typeof c.ath === 'number' && c.ath > 0;
    if (hasAth) {
        const drawdown = ((c.current_price - c.ath) / c.ath) * 100;
        if (drawdown < -80) score += 15;
        else if (drawdown < -50) score += 10;
        else if (drawdown < -30) score += 5;
    }

    if (btcTrend === 'macro_downtrend' && btcCorr > 0.7) score += 10;
    if (btcTrend === 'macro_uptrend' && btcCorr > 0.7) score -= 5;

    return Math.min(Math.max(score, 0), 100);
}

function determineMarketPhase(c, ch24, ch7, ch30, btcTrend) {
    const isUptrend = ch24 > 0 && ch7 > 0 && ch30 > 0;
    const isDowntrend = ch24 < 0 && ch7 < 0 && ch30 < 0;
    const isSideways = Math.abs(ch24) < 2 && Math.abs(ch7) < 10 && Math.abs(ch30) < 20;

    if (btcTrend === 'macro_uptrend' && isUptrend) return 'macro_uptrend_coin_uptrend';
    if (btcTrend === 'macro_downtrend' && isDowntrend) return 'macro_downtrend_coin_downtrend';
    if (btcTrend === 'macro_uptrend' && isDowntrend) return 'rotation_phase';
    if (btcTrend === 'macro_downtrend' && isUptrend) return 'rotation_phase';

    if (ch24 > 10) return 'distribution';
    if (ch24 < -15) return 'panic_selling';
    if (isUptrend) return 'accumulation_uptrend';
    if (isDowntrend) return 'accumulation_downtrend';
    if (isSideways) return 'consolidation';

    if (ch24 > 0 && ch7 < 0) return 'short_term_rally';
    if (ch24 < 0 && ch7 > 0) return 'pullback';

    return 'uncertain';
}

// ============================================================
// AI СОВЕТНИК - РЕНДЕРИНГ
// ============================================================

function renderAdvisor() {
    const list = document.getElementById('advisorList');
    if (!list) return;

    const stateEl = document.getElementById('autoAlertsState');
    if (stateEl) stateEl.textContent = autoAlertsEnabled ? 'on' : 'off';

    list.innerHTML = '';

    let marketTxt = 'Рынок нейтрален. ';
    if (fearData && fearData.data && fearData.data[0]) {
        const f = parseInt(fearData.data[0].value);
        if (f < 25) marketTxt = '<strong style="color:var(--green)">Рынок в экстремальном страхе</strong> — исторически лучшее время для покупок. ';
        else if (f < 45) marketTxt = '<strong style="color:var(--green)">Рынок в страхе</strong> — рассмотрите постепенные покупки (DCA). ';
        else if (f > 75) marketTxt = '<strong style="color:var(--red)">Рынок в жадности</strong> — возможна коррекция, фиксируйте прибыль. ';
        else if (f > 55) marketTxt = '<strong style="color:var(--yellow)">Рынок оптимистичен</strong> — будьте осторожны с новыми входами. ';
    }
    if (globalData && globalData.data) {
        const g = globalData.data;
        marketTxt += 'BTC доминация <strong>' + g.market_cap_percentage.btc.toFixed(1) + '%</strong>. ';
        if (g.market_cap_percentage.btc > 55) marketTxt += 'Высокая доминация BTC — альты могут отставать, фокус на BTC. ';
        else if (g.market_cap_percentage.btc < 45) marketTxt += 'Низкая доминация BTC — возможен <strong>сезон альтов</strong>. ';
    }

    list.innerHTML += '<div class="advice-card hold"><div class="advice-header"><div class="advice-title">Общий рыночный контекст</div><span class="advice-badge badge-hold">анализ</span></div><div class="advice-text">' + marketTxt + '</div></div>';

    let items = [];
    let buyCount = 0,
        sellCount = 0,
        holdCount = 0;

    portfolio.forEach(h => {
        const c = findCoin(h.coinId || h.symbol.toLowerCase());
        if (!c) return;
        const adv = generateCoinAdvice(h, c);
        if (adv.badge === 'buy') buyCount++;
        else if (adv.badge === 'sell') sellCount++;
        else holdCount++;
        items.push({ h, c, adv });
    });

    const sb = document.getElementById('sumBuy');
    if (sb) sb.textContent = buyCount;
    const ss = document.getElementById('sumSell');
    if (ss) ss.textContent = sellCount;
    const sh = document.getElementById('sumHold');
    if (sh) sh.textContent = holdCount;
    const sa = document.getElementById('sumAlerts');
    if (sa) sa.textContent = alertsList.filter(a => !a.fired).length;

    if (advisorFilter !== 'all') {
        items = items.filter(x => x.adv.badge === advisorFilter);
    }

    if (!items.length) {
        list.innerHTML += '<div class="card" style="color:var(--text-3)">Нет монет по выбранному фильтру</div>';
        return;
    }

    items.forEach(({ h, c, adv }) => {
        const autoInfo = adv.autoAlert ?
            '<div style="margin-top:10px;font-size:12px;color:var(--text-3)">Авто-алерт: ' + (adv.autoAlert.action === 'buy' ? 'докупить' : 'продать') + ' при цене ' + (adv.autoAlert.type === 'below' ? 'ниже ' : 'возле ') + fmt$(adv.autoAlert.value) + (adv.autoAlert.suggestedAmount ? (' · сумма ~' + fmt$(adv.autoAlert.suggestedAmount)) : '') + ' — уведомление придёт автоматически</div>' :
            '';

        list.innerHTML +=
            '<div class="advice-card ' + adv.type + '">' +
            '<div class="advice-header">' +
            '<div class="advice-title">' + c.name + ' (' + h.symbol + ')</div>' +
            '<span class="advice-badge badge-' + adv.badge + '">' + (adv.badge === 'buy' ? 'КУПИТЬ' : adv.badge === 'sell' ? 'ПРОДАТЬ' : 'ДЕРЖАТЬ') + '</span>' +
            '</div>' +
            '<div class="advice-text">' + adv.text + '</div>' +
            adv.actionHtml +
            autoInfo +
            '</div>';
    });

    renderNewCoinSuggestions();
}

function setAdvisorFilter(filter) {
    advisorFilter = filter;
    renderAdvisor();
}

function toggleAutoAlerts() {
    autoAlertsEnabled = !autoAlertsEnabled;
    saveAutoAlertSettings();
    const stateEl = document.getElementById('autoAlertsState');
    if (stateEl) stateEl.textContent = autoAlertsEnabled ? 'on' : 'off';
    if (autoAlertsEnabled) {
        syncAutoAlertsFromAdvisor();
    } else {
        alertsList = alertsList.filter(a => !a.autoGenerated);
        saveAlerts();
    }
    renderAdvisor();
}

function syncAutoAlertsFromAdvisor() {
    if (!autoAlertsEnabled) return;

    const nextAlerts = [];
    portfolio.forEach(h => {
        const c = findCoin(h.coinId || h.symbol.toLowerCase());
        if (!c) return;
        const adv = generateCoinAdvice(h, c);
        if (!adv.autoAlert || !adv.autoAlert.enabled) return;

        const s = adv.s;
        if (!s || typeof s.buyScore === 'undefined' || typeof s.sellScore === 'undefined') return;
        const shouldSend = shouldSendNotification(h.id, adv.type, adv.badge, s.buyScore, s.sellScore, c.current_price);

        if (shouldSend) {
            nextAlerts.push({
                coinId: h.coinId,
                coinId_h: h.id,
                symbol: h.symbol,
                type: adv.autoAlert.type,
                value: adv.autoAlert.value,
                suggestedAmount: adv.autoAlert.suggestedAmount || 0,
                action: adv.autoAlert.action || adv.badge
            });

            recordNotificationState(h.id, adv.type, adv.badge, s.buyScore, s.sellScore, c.current_price);
        }
    });

    const manualAlerts = alertsList.filter(a => !a.autoGenerated);
    const oldAuto = alertsList.filter(a => a.autoGenerated);
    const oldMap = new Map(oldAuto.map(a => [makeAlertSignature(a), a]));

    const autoAlerts = nextAlerts.map(a => {
        const signature = makeAlertSignature(a);
        const existing = oldMap.get(signature);
        return {
            id: existing ? existing.id : uid(),
            coinId: a.coinId,
            coinId_h: a.coinId_h,
            symbol: a.symbol,
            type: a.type,
            value: a.value,
            suggestedAmount: a.suggestedAmount,
            fired: existing ? existing.fired : false,
            created: existing ? existing.created : Date.now(),
            autoGenerated: true,
            action: a.action,
            signature: signature
        };
    });

    alertsList = [...manualAlerts, ...autoAlerts];
    saveAlerts();
}

function makeAlertSignature(a) {
    return [a.coinId_h, a.type, Number(a.value).toFixed(4), Number(a.suggestedAmount || 0).toFixed(2), a.action || ''].join('|');
}

// ============================================================
// ПРЕДЛОЖЕНИЯ НОВЫХ МОНЕТ
// ============================================================

function renderNewCoinSuggestions() {
    const container = document.getElementById('newCoinSuggestions');
    if (!container) return;

    const suggestions = suggestNewCoins(5);

    if (suggestions.length === 0) {
        container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-3)">Нет предложений для новых монет</div>';
        return;
    }

    let html = '<div style="padding:16px"><h3 style="margin:0 0 16px 0;font-size:16px">💡 Предложения для покупки</h3>';

    suggestions.forEach(s => {
        const c = s.coin;
        const reasonsText = s.reasons.join(', ');

        html += `
            <div style="background:var(--surface-2);border-radius:8px;padding:12px;margin-bottom:12px;border:1px solid var(--border)">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <div style="display:flex;align-items:center;gap:8px">
                        <img src="${c.image}" style="width:24px;height:24px;border-radius:50%">
                        <span style="font-weight:700">${c.symbol.toUpperCase()}</span>
                        <span style="font-size:12px;color:var(--text-3)">$${c.current_price?.toFixed(4) || 'N/A'}</span>
                    </div>
                    <div style="display:flex;gap:8px">
                        <span class="signal-chip green">score: ${s.score}</span>
                        <span class="signal-chip blue">${s.coinInfo.category}</span>
                    </div>
                </div>
                <div style="font-size:12px;color:var(--text-2);margin-bottom:8px">
                    24ч: <span style="${s.ch24 >= 0 ? 'color:var(--green)' : 'color:var(--red)'}">${fmtPct(s.ch24)}</span> |
                    7д: <span style="${s.ch7 >= 0 ? 'color:var(--green)' : 'color:var(--red)'}">${fmtPct(s.ch7)}</span> |
                    RSI: <span class="signal-chip orange">${s.rsi}</span> |
                    EMA: <span class="signal-chip yellow">${s.emaTrend}</span>
                </div>
                <div style="font-size:12px;color:var(--text-3)">
                    <strong>Причины:</strong> ${reasonsText}
                    ${s.seasonality.isBullish ? `<br><span style="color:var(--green)">📅 Сезонность: ${s.seasonality.monthName} (${s.seasonality.reason})</span>` : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function suggestNewCoins(limit = 5) {
    const portfolioSymbols = new Set(portfolio.map(h => h.symbol.toLowerCase()));
    const suggestions = [];

    allCoins.forEach(c => {
        const symbol = c.symbol.toLowerCase();
        if (portfolioSymbols.has(symbol)) return;

        const coinInfo = getCoinInfo(symbol, c);
        const ch24 = c.price_change_percentage_24h || 0;
        const ch7 = c.price_change_percentage_7d_in_currency || 0;
        const ch30 = c.price_change_percentage_30d_in_currency || 0;
        const rsi = calculateRSI(c);
        const emaTrend = calculateEMATrend(c);
        const seasonality = calculateSeasonality(c);
        const sr = calculateSupportResistance(c);

        let score = 0;
        const reasons = [];

        if (emaTrend === 'strong_uptrend') { score += 20;
            reasons.push('сильный восходящий тренд'); }
        if (emaTrend === 'uptrend') { score += 10;
            reasons.push('восходящий тренд'); }

        if (ch24 > 5 && ch24 < 20) { score += 15;
            reasons.push('здоровый рост 24ч'); }
        if (ch7 > 10 && ch7 < 30) { score += 15;
            reasons.push('рост за неделю'); }
        if (ch30 > 20) { score += 10;
            reasons.push('рост за месяц'); }

        if (rsi >= 40 && rsi <= 65) { score += 15;
            reasons.push('RSI в здоровой зоне'); }
        if (rsi < 40) { score += 10;
            reasons.push('RSI показывает потенциал'); }

        if (sr.nearSupport) { score += 15;
            reasons.push('уровень поддержки'); }

        if (seasonality.isBullish) { score += Math.round(seasonality.strength * 10);
            reasons.push('сезонность: ' + seasonality.monthName); }

        if (coinInfo.category === 'fundamental_l1' || coinInfo.category === 'fundamental_l2') {
            score += 10;
            reasons.push('фундаментальный актив');
        }

        const vol24 = c.total_volume || 0;
        const mcap = c.market_cap || 1;
        const volRatio = vol24 / mcap;
        if (volRatio > 0.05) { score += 5;
            reasons.push('хорошая ликвидность'); }

        if (score >= 30) {
            suggestions.push({
                coin: c,
                coinInfo,
                score,
                reasons,
                ch24,
                ch7,
                ch30,
                rsi,
                emaTrend,
                seasonality,
                supportResistance: sr
            });
        }
    });

    return suggestions
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

function calculateSeasonality(c) {
    const currentMonth = new Date().getMonth();

    const seasonalityPatterns = {
        0: { name: 'Январь', trend: 'bullish', strength: 0.7, reason: 'January effect - new year optimism' },
        1: { name: 'Февраль', trend: 'neutral', strength: 0.5, reason: 'Post-January correction typical' },
        2: { name: 'Март', trend: 'bullish', strength: 0.6, reason: 'Q1 rally continuation' },
        3: { name: 'Апрель', trend: 'neutral', strength: 0.4, reason: 'Tax season selling pressure' },
        4: { name: 'Май', trend: 'bearish', strength: 0.6, reason: 'Sell in May and go away pattern' },
        5: { name: 'Июнь', trend: 'neutral', strength: 0.5, reason: 'Summer lull begins' },
        6: { name: 'Июль', trend: 'neutral', strength: 0.4, reason: 'Summer low volume' },
        7: { name: 'Август', trend: 'neutral', strength: 0.4, reason: 'Summer doldrums' },
        8: { name: 'Сентябрь', trend: 'bearish', strength: 0.7, reason: 'Historically worst month for crypto' },
        9: { name: 'Октябрь', trend: 'bullish', strength: 0.6, reason: 'Uptober - Q4 rally starts' },
        10: { name: 'Ноябрь', trend: 'bullish', strength: 0.8, reason: 'Pre-holiday rally' },
        11: { name: 'Декабрь', trend: 'bullish', strength: 0.7, reason: 'Santa Claus rally' }
    };

    const pattern = seasonalityPatterns[currentMonth] || { name: 'Unknown', trend: 'neutral', strength: 0.5, reason: 'No data' };

    let categoryAdjustment = 0;
    const category = getCoinInfo(c.symbol, c).category;

    if (category === 'meme' && (currentMonth === 9 || currentMonth === 10 || currentMonth === 11)) {
        categoryAdjustment = 0.2;
    }

    if (category === 'fundamental_l1' || category === 'fundamental_l2') {
        categoryAdjustment = -0.1;
    }

    return {
        month: currentMonth,
        monthName: pattern.name,
        trend: pattern.trend,
        strength: Math.min(1, pattern.strength + categoryAdjustment),
        reason: pattern.reason,
        isBullish: pattern.trend === 'bullish',
        isBearish: pattern.trend === 'bearish'
    };
}

function calculateSupportResistance(c) {
    const sparkline7d = c.sparkline_in_7d?.price;
    const sparkline30d = c.sparkline_in_30d?.price;

    const prices = sparkline30d || sparkline7d;

    if (!prices || prices.length < 10) {
        return { support: null, resistance: null, current: c.current_price };
    }

    const currentPrice = c.current_price;
    const sortedPrices = [...prices].sort((a, b) => a - b);

    const localMinima = [];
    const localMaxima = [];

    for (let i = 2; i < prices.length - 2; i++) {
        const prev2 = prices[i - 2];
        const prev1 = prices[i - 1];
        const current = prices[i];
        const next1 = prices[i + 1];
        const next2 = prices[i + 2];

        if (current < prev1 && current < prev2 && current < next1 && current < next2) {
            localMinima.push(current);
        }

        if (current > prev1 && current > prev2 && current > next1 && current > next2) {
            localMaxima.push(current);
        }
    }

    const supportsBelow = localMinima.filter(p => p < currentPrice).sort((a, b) => b - a);
    const support = supportsBelow.length > 0 ? supportsBelow[0] : sortedPrices[0];

    const resistancesAbove = localMaxima.filter(p => p > currentPrice).sort((a, b) => a - b);
    const resistance = resistancesAbove.length > 0 ? resistancesAbove[0] : sortedPrices[sortedPrices.length - 1];

    const supportDistance = support ? ((currentPrice - support) / currentPrice) * 100 : null;
    const resistanceDistance = resistance ? ((resistance - currentPrice) / currentPrice) * 100 : null;

    return {
        support,
        resistance,
        current: currentPrice,
        supportDistance,
        resistanceDistance,
        nearSupport: supportDistance && supportDistance < 5,
        nearResistance: resistanceDistance && resistanceDistance < 5
    };
}

// ============================================================
// ОРДЕРА
// ============================================================

let ordersSortBySum = true; // По умолчанию сортировка по сумме

function toggleOrdersSort(type) {
    ordersSortBySum = type === 'sum';
    renderOrders();
}

function renderOrders() {
    const container = document.getElementById('ordersList');
    const summaryEl = document.getElementById('ordersSummary');
    const globalImpactEl = document.getElementById('globalOrdersImpact');
    const badgeEl = document.getElementById('ordersBadge');
    const searchInput = document.getElementById('ordersSearch');

    if (!container) return;

    checkOrderExecution();

    let filteredOrders = orders;
    if (orderStatusFilter !== 'all') {
        filteredOrders = orders.filter(o => o.status === orderStatusFilter);
    }
    
    // Применяем фильтр по поиску
    let searchTerm = '';
    if (searchInput && searchInput.value.trim()) {
        searchTerm = searchInput.value.trim().toLowerCase();
        filteredOrders = filteredOrders.filter(o => 
            o.symbol.toLowerCase().includes(searchTerm) ||
            (o.coinId && o.coinId.toLowerCase().includes(searchTerm))
        );
    }

    if (badgeEl) {
        const activeCount = orders.filter(o => o.status === 'active' || o.status === 'pending').length;
        const executedCount = orders.filter(o => o.status === 'executed').length;
        if (activeCount > 0 || executedCount > 0) {
            badgeEl.style.display = 'inline';
            badgeEl.textContent = activeCount + ' активных · ' + executedCount + ' исполнено';
        } else {
            badgeEl.style.display = 'none';
        }
    }

    if (!filteredOrders.length) {
        container.innerHTML = '<div style="color:var(--text-3);padding:16px 0;font-size:13px;">нет ордеров по выбранному фильтру.</div>';
        if (summaryEl) summaryEl.textContent = '';
        if (globalImpactEl) globalImpactEl.innerHTML = '';
        return;
    }

    const activeOrders = orders.filter(o => o.status === 'active');
    const inactiveOrders = orders.filter(o => o.status === 'inactive');
    const pendingOrders = orders.filter(o => o.status === 'pending');
    const executedOrders = orders.filter(o => o.status === 'executed');

    const activeLocked = activeOrders.reduce((s, o) => s + (o.total || o.amount * o.price), 0);
    const inactiveLocked = inactiveOrders.reduce((s, o) => s + (o.total || o.amount * o.price), 0);
    const pendingLocked = pendingOrders.reduce((s, o) => s + (o.total || o.amount * o.price), 0);

    let globalHtml = '';
    let impactOrders = orders.filter(o => o.status === 'active' || o.status === 'pending');
    
    // Применяем фильтр по поиску к impactOrders для мини-списка
    if (searchTerm) {
        impactOrders = impactOrders.filter(o => 
            o.symbol.toLowerCase().includes(searchTerm) ||
            (o.coinId && o.coinId.toLowerCase().includes(searchTerm))
        );
    }
    
    if (impactOrders.length > 0) {
        const coinImpacts = {};
        impactOrders.forEach(o => {
            const holding = portfolio.find(h => h.coinId === o.coinId);
            const c = findCoin(o.coinId);
            if (!coinImpacts[o.coinId]) {
                coinImpacts[o.coinId] = {
                    symbol: o.symbol,
                    coin: c,
                    holding: holding,
                    totalAddAmount: 0,
                    totalAddCost: 0,
                    orders: []
                };
            }
            coinImpacts[o.coinId].totalAddAmount += o.amount;
            coinImpacts[o.coinId].totalAddCost += (o.total || o.amount * o.price);
            coinImpacts[o.coinId].orders.push(o);
        });

        let totalGlobalLocked = 0;
        let totalGlobalNewValue = 0;
        let perCoinHtml = '';

        Object.values(coinImpacts)
            .sort((a, b) => {
                if (ordersSortBySum) {
                    return b.totalAddCost - a.totalAddCost;
                } else {
                    return a.symbol.localeCompare(b.symbol);
                }
            })
            .forEach(impact => {
                const h = impact.holding;
                const c = impact.coin;
                const currentHoldingAmount = h ? h.amount : 0;
                const currentHoldingAvg = h ? h.avgPrice : 0;
                const newTotalAmount = currentHoldingAmount + impact.totalAddAmount;
                const newAvg = newTotalAmount > 0 ?
                    (currentHoldingAmount * currentHoldingAvg + impact.totalAddCost) / newTotalAmount :
                    impact.totalAddCost / impact.totalAddAmount;

                totalGlobalLocked += impact.totalAddCost;

                const marketPrice = c ? c.current_price : 0;
                totalGlobalNewValue += newTotalAmount * marketPrice;

                const avgDiff = newAvg - currentHoldingAvg;
                const avgColor = avgDiff < 0 ? 'avg-pos' : (avgDiff > 0 ? 'avg-neg' : '');

                const currentPnl = currentHoldingAvg > 0 ? ((marketPrice - currentHoldingAvg) / currentHoldingAvg) * 100 : 0;
                const newPnl = newAvg > 0 ? ((marketPrice - newAvg) / newAvg) * 100 : 0;
                const pnlColor = newPnl >= 0 ? 'var(--green)' : 'var(--red)';

                const avgDiffColor = avgDiff < 0 ? 'var(--green)' : (avgDiff > 0 ? 'var(--red)' : 'var(--text)');
                const orderCount = impact.orders.length;

                perCoinHtml += '<div class="per-coin-card" onclick="scrollToOrders(\'' + impact.symbol + '\')" style="cursor:pointer;position:relative;">' +
                    (orderCount > 1 ? '<div class="order-count-badge">' + orderCount + '</div>' : '') +
                    '<div class="per-coin-locked">' +
                    '<span class="label">заблокировано:</span> <span class="value" style="font-weight:700;">' + fmt$(impact.totalAddCost) + '</span>' +
                    '</div>' +
                    '<div class="per-coin-header">' +
                    '<div class="per-coin-header-left">' +
                    (c && c.image ? '<img src="' + c.image + '" class="per-coin-img" alt="">' : '<div class="per-coin-img" style="background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;">' + impact.symbol[0] + '</div>') +
                    '<div class="per-coin-symbol">' + impact.symbol + '</div>' +
                    '</div>' +
                    '<div class="per-coin-price">' + fmt$(marketPrice) + '</div>' +
                    '</div>' +
                    '<div class="per-coin-row">' +
                    '<span class="label">кол-во:</span> <span class="value">' + (h ? h.amount.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0') + '</span> <span style="color:var(--text-3)">→</span> <span class="value">' + newTotalAmount.toLocaleString(undefined, { maximumFractionDigits: 4 }) + '</span>' +
                    '</div>' +
                    '<div class="per-coin-row">' +
                    '<span class="label">средняя:</span> <span class="value">' + fmt$(currentHoldingAvg) + '</span> <span style="color:var(--text-3)">→</span> <span class="value" style="color:' + avgDiffColor + ';">' + fmt$(newAvg) + '</span>' +
                    '</div>' +
                    '<div class="per-coin-row">' +
                    '<span class="label">P&L%:</span> <span style="color:var(--text-2);">' + (currentPnl >= 0 ? '+' : '') + currentPnl.toFixed(1) + '%</span> <span style="color:var(--text-3)">→</span> <span style="color:' + pnlColor + ';font-weight:600;">' + (newPnl >= 0 ? '+' : '') + newPnl.toFixed(1) + '%</span>' +
                    '</div>' +
                    '</div>';
            });

        globalHtml = '<div class="global-impact-card">' +
            '<div class="global-impact-title">📊 Влияние на портфель при исполнении ВСЕХ активных ордеров</div>' +
            '<div class="global-impact-grid">' +
            '<div class="global-impact-metric">' +
            '<div class="global-impact-value">' + fmt$(totalGlobalLocked) + '</div>' +
            '<div class="global-impact-label">всего будет вложено</div>' +
            '</div>' +
            '<div class="global-impact-metric">' +
            '<div class="global-impact-value">' + fmt$(totalGlobalNewValue) + '</div>' +
            '<div class="global-impact-label">новая стоимость позиций</div>' +
            '</div>' +
            '<div class="global-impact-metric">' +
            '<div class="global-impact-value">' + Object.keys(coinImpacts).length + '</div>' +
            '<div class="global-impact-label">монет под ордерами</div>' +
            '</div>' +
            '<div class="global-impact-metric">' +
            '<div class="global-impact-value">' + impactOrders.length + '</div>' +
            '<div class="global-impact-label">всего ордеров</div>' +
            '</div>' +
            '</div>' +
            '<div class="per-coin-section">' +
            '<div class="per-coin-label" style="display:flex; align-items:center; gap:8px;">По каждой монете:' +
            '<div style="display:flex; gap:4px; background:var(--bg-card); border-radius:30px; padding:3px; border:1px solid var(--border-color);">' +
            '<button class="btn btn-xs ' + (ordersSortBySum ? 'active' : '') + '" onclick="toggleOrdersSort(\'sum\')" title="По сумме" style="border-radius:20px; background:' + (ordersSortBySum ? 'var(--blue)' : 'transparent') + '; border:1px solid ' + (ordersSortBySum ? 'var(--blue)' : 'var(--border-color)') + '; color:' + (ordersSortBySum ? '#fff' : 'var(--text-muted)') + '; padding:4px 8px;"><i class="fas fa-dollar-sign"></i></button>' +
            '<button class="btn btn-xs ' + (!ordersSortBySum ? 'active' : '') + '" onclick="toggleOrdersSort(\'alpha\')" title="По алфавиту" style="border-radius:20px; background:' + (!ordersSortBySum ? 'var(--blue)' : 'transparent') + '; border:1px solid ' + (!ordersSortBySum ? 'var(--blue)' : 'var(--border-color)') + '; color:' + (!ordersSortBySum ? '#fff' : 'var(--text-muted)') + '; padding:4px 8px;"><i class="fas fa-sort-alpha-down"></i></button>' +
            '</div>' +
            '</div>' +
            '<div class="per-coin-grid">' + perCoinHtml + '</div>' +
            '</div>' +
            '</div>';
    }

    if (globalImpactEl) globalImpactEl.innerHTML = globalHtml;

    let summaryText = '';
    if (activeOrders.length > 0) {
        summaryText += 'активные: <strong style="color:var(--text);">' + fmt$(activeLocked) + '</strong> · ' + activeOrders.length + ' шт. ';
    }
    if (inactiveOrders.length > 0) {
        summaryText += 'неактивные: <strong style="color:var(--text-3);">' + fmt$(inactiveLocked) + '</strong> · ' + inactiveOrders.length + ' шт. ';
    }
    if (pendingOrders.length > 0) {
        summaryText += 'в ожидании: <strong style="color:var(--yellow);">' + fmt$(pendingLocked) + '</strong> · ' + pendingOrders.length + ' шт. ';
    }
    if (executedOrders.length > 0) {
        const executedTotal = executedOrders.reduce((s, o) => s + (o.total || o.amount * o.price), 0);
        summaryText += 'исполнено: <strong style="color:var(--green);">' + fmt$(executedTotal) + '</strong> · ' + executedOrders.length + ' шт.';
    }
    if (summaryEl) summaryEl.innerHTML = summaryText;

    filteredOrders.sort((a, b) => {
        if (a.symbol !== b.symbol) return a.symbol.localeCompare(b.symbol);
        return a.created - b.created;
    });

    let cardsHtml = '<div class="orders-flat-grid">';

    filteredOrders.forEach(o => {
        const coin = findCoin(o.coinId);
        const currentPrice = coin ? coin.current_price : 0;
        const marketPrice = currentPrice || o.price;

        const marketDiff = marketPrice > 0 ? ((o.price - marketPrice) / marketPrice) * 100 : 0;
        const diffBadge = marketDiff >= 0 ?
            '<span class="market-diff-badge pos">+' + marketDiff.toFixed(1) + '% от рынка</span>' :
            '<span class="market-diff-badge neg">' + marketDiff.toFixed(1) + '% от рынка</span>';

        let execPct = 0;
        let execColor = 'var(--yellow)';
        let execLabel = '';
        let execClass = 'waiting';

        if (o.status === 'executed') {
            execPct = 100;
            execColor = 'var(--green)';
            execLabel = 'исполнен';
            execClass = 'executed';
        } else if (o.status === 'inactive') {
            execPct = 0;
            execColor = 'var(--text-3)';
            execLabel = 'неактивен';
            execClass = 'inactive';
        } else {
            if (marketPrice <= o.price) {
                execPct = 100;
                execColor = 'var(--green)';
                execLabel = 'готов к исполнению';
                execClass = 'ready';
            } else {
                const diff = ((marketPrice - o.price) / o.price) * 100;
                execPct = Math.max(0, Math.min(95, 100 - diff));
                execColor = 'var(--yellow)';
                execLabel = 'нужен рост +' + diff.toFixed(1) + '%';
                execClass = 'waiting';
            }
        }

        const holding = portfolio.find(h => h.coinId === o.coinId);
        const currentHoldingAmount = holding ? holding.amount : 0;
        const currentHoldingAvg = holding ? holding.avgPrice : 0;
        const newTotalAmount = currentHoldingAmount + o.amount;
        const newAvg = newTotalAmount > 0 ?
            (currentHoldingAmount * currentHoldingAvg + o.amount * o.price) / newTotalAmount :
            o.price;
        const avgChange = newAvg - currentHoldingAvg;

        const statusBadgeClass = {
            active: 'status-active',
            inactive: 'status-inactive',
            executed: 'status-executed',
            pending: 'status-pending'
        } [o.status] || 'status-pending';

        const statusName = {
            active: 'АКТИВЕН',
            inactive: 'НЕАКТИВЕН',
            executed: 'ИСПОЛНЕН',
            pending: 'В ОЖИДАНИИ'
        } [o.status] || o.status;

        cardsHtml += '<div class="order-card" id="order-' + o.id + '" data-order-symbol="' + o.symbol + '">' +
            '<div class="order-header">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
            (coin ? '<img src="' + coin.image + '" style="width:28px;height:28px;border-radius:50%">' : '<div class="coin-img" style="width:28px;height:28px;font-size:12px">' + o.symbol[0] + '</div>') +
            '<div>' +
            '<div class="order-title">' + (coin ? coin.name : o.symbol) + ' (' + o.symbol + ')' + diffBadge + '</div>' +
            '<div style="font-size:11px;color:var(--text-3)">лимитный ордер на покупку</div>' +
            '</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
            '<span class="order-status-badge ' + statusBadgeClass + '">' + statusName + '</span>' +
            '</div>' +
            '</div>' +
            '<div style="font-size:12px;color:var(--text-3);margin:8px 0;display:flex;gap:16px;flex-wrap:wrap;">' +
            '<span>🕐 открыт: ' + (o.created ? new Date(o.created).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—') + '</span>' +
            (o.status === 'executed' && o.executedAt ? '<span style="color:var(--green)">✓ исполнен: ' + new Date(o.executedAt).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + '</span>' : '') +
            '</div>' +

            '<div class="order-grid">' +
            '<div class="order-metric">' +
            '<div class="order-metric-value">' + o.amount.toLocaleString(undefined, { maximumFractionDigits: 6 }) + '</div>' +
            '<div class="order-metric-label">кол-во ' + o.symbol + '</div>' +
            '</div>' +
            '<div class="order-metric">' +
            '<div class="order-metric-value">' + fmt$(o.price) + '</div>' +
            '<div class="order-metric-label">цена ордера</div>' +
            '</div>' +
            '<div class="order-metric">' +
            '<div class="order-metric-value">' + fmt$(o.total || o.amount * o.price) + '</div>' +
            '<div class="order-metric-label">сумма USDT</div>' +
            '</div>' +
            '<div class="order-metric">' +
            '<div class="order-metric-value" style="color:' + (marketPrice <= o.price && o.status !== 'inactive' ? 'var(--green)' : 'var(--text)') + '">' + fmt$(marketPrice) + '</div>' +
            '<div class="order-metric-label">текущая цена</div>' +
            '</div>' +
            '</div>' +

            '<div class="order-exec-progress">' +
            '<div class="order-exec-label">' +
            '<span style="color:var(--text-3)">прогресс к исполнению</span>' +
            '<span class="exec-pct ' + execClass + '">' + execLabel + '</span>' +
            '</div>' +
            '<div class="order-exec-track">' +
            '<div class="order-exec-fill" style="width:' + execPct + '%;background:' + execColor + '"></div>' +
            '</div>' +
            '</div>' +

            '<div class="order-impact">' +
            '<div style="font-weight:600;margin-bottom:10px;color:var(--blue)">📊 Влияние на портфель после исполнения</div>' +
            '<div class="order-impact-grid">' +
            '<div>' +
            '<div style="font-size:11px;color:var(--text-3);margin-bottom:4px;">сейчас в портфеле</div>' +
            '<div style="font-weight:700;font-size:15px;">' + currentHoldingAmount.toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' <span style="font-size:12px;color:var(--text-3);font-weight:500;">' + o.symbol + '</span></div>' +
            (holding ? '<div style="font-size:12px;color:var(--text-3);margin-top:2px;">средняя ' + fmt$(currentHoldingAvg) + '</div>' : '<div style="font-size:12px;color:var(--text-3);margin-top:2px;">нет позиции</div>') +
            '</div>' +
            '<div class="arrow-col" style="text-align:center;font-size:20px;color:var(--text-3);">→</div>' +
            '<div>' +
            '<div style="font-size:11px;color:var(--text-3);margin-bottom:4px;">будет в портфеле</div>' +
            '<div style="font-weight:700;font-size:15px;">' + newTotalAmount.toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' <span style="font-size:12px;color:var(--text-3);font-weight:500;">' + o.symbol + '</span></div>' +
            '<div style="font-size:12px;color:var(--text-3);margin-top:2px;">новая средняя ' + fmt$(newAvg) +
            (holding && avgChange !== 0 ? ' <span style="color:' + (avgChange < 0 ? 'var(--green)' : 'var(--red)') + '">(' + (avgChange < 0 ? '' : '+') + fmt$(avgChange) + ')</span>' : '') +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
            '<div style="font-size:12px;color:var(--text-3)">всего вложено будет: <strong style="color:var(--text);">' + fmt$(newTotalAmount * newAvg) + '</strong></div>' +
            '<div style="font-size:12px;color:var(--text-3)">текущая стоимость позиции: <strong style="color:var(--text);">' + fmt$(newTotalAmount * marketPrice) + '</strong></div>' +
            '</div>' +
            '</div>' +

            '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;align-items:center;">' +
            (o.status === 'active' || o.status === 'pending' ?
                '<button class="btn btn-sm btn-primary" onclick="executeOrder(\'' + o.id + '\')" title="Исполнить ордер и добавить в портфель" style="padding:4px 8px;display:flex;align-items:center;justify-content:center;">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' +
                '</button>' :
                (o.status === 'executed' ?
                    '<span style="color:var(--green);font-weight:700;font-size:14px;">✓ исполнен</span>' :
                    ''
                )
            ) +
            '<select class="order-status-select" onchange="changeOrderStatus(\'' + o.id + '\', this.value)">' +
            '<option value="active" ' + (o.status === 'active' ? 'selected' : '') + '>активен</option>' +
            '<option value="inactive" ' + (o.status === 'inactive' ? 'selected' : '') + '>неактивен</option>' +
            '<option value="pending" ' + (o.status === 'pending' ? 'selected' : '') + '>в ожидании</option>' +
            '<option value="executed" ' + (o.status === 'executed' ? 'selected' : '') + '>исполнен</option>' +
            '</select>' +
            '<button class="btn btn-sm" onclick="openEditOrderModal(\'' + o.id + '\')">редактировать</button>' +
            '<button class="btn btn-sm btn-danger" onclick="delOrder(\'' + o.id + '\')">удалить</button>' +
            '</div>' +
            '</div>';
    });

    cardsHtml += '</div>';
    container.innerHTML = cardsHtml;
}

function setOrderFilter(filter) {
    orderStatusFilter = filter;
    document.querySelectorAll('.order-filters .filter-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderOrders();
}

function filterOrdersByCoin(searchTerm) {
    renderOrders();
}

function checkOrderExecution() {
    let anyExecuted = false;
    orders.forEach(o => {
        if (o.status === 'active' || o.status === 'pending') {
            const c = findCoin(o.coinId);
            if (c && c.current_price > 0) {
                if (c.current_price <= o.price) {
                    addPurchaseFromOrder(o);
                    o.status = 'executed';
                    o.executedAt = Date.now();
                    anyExecuted = true;
                    addNotification(o.symbol + ': ордер на покупку исполнен по цене ' + fmt$(o.price), 'buy');
                }
            }
        }
    });
    if (anyExecuted) {
        saveOrders();
        renderAll();
    }
}

function addPurchaseFromOrder(order) {
    let holding = portfolio.find(h => h.coinId === order.coinId);
    if (!holding) {
        holding = {
            id: uid(),
            coinId: order.coinId,
            symbol: order.symbol,
            amount: 0,
            avgPrice: 0,
            purchases: [],
            targetPrice: null,
            stopLoss: null,
            notes: '',
            realizedPnl: 0
        };
        portfolio.push(holding);
    }

    const purchase = {
        id: uid(),
        date: new Date().toISOString().split('T')[0],
        amount: order.amount,
        price: order.price,
        type: 'buy'
    };
    holding.purchases.push(purchase);

    recalcRealizedPnl(holding);
    recomputeHolding(holding);
    savePortfolio();
}

function executeOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        alert('Ордер не найден');
        return;
    }
    if (order.status === 'executed') {
        alert('Ордер уже исполнен');
        return;
    }
    if (order.status === 'inactive') {
        alert('Ордер неактивен');
        return;
    }

    addPurchaseFromOrder(order);

    order.status = 'executed';
    order.executedAt = Date.now();
    saveOrders();

    addNotification(order.symbol + ': ордер исполнен по цене ' + fmt$(order.price) + ' на сумму ' + fmt$(order.amount * order.price), 'buy');

    renderAll();
}

function changeOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    order.status = newStatus;
    if (newStatus === 'executed') {
        order.executedAt = Date.now();
    } else {
        order.executedAt = null;
    }
    saveOrders();
    renderOrders();
}

function openOrderModal() {
    currentEditOrderId = null;
    document.getElementById('orderModalTitle').textContent = 'добавить ордер на покупку';
    document.getElementById('orderCoinId').value = '';
    document.getElementById('orderCoinSearch').value = '';
    document.getElementById('orderCoinImg').value = '';
    document.getElementById('orderQty').value = '';
    document.getElementById('orderPrice').value = '';
    document.getElementById('orderTotal').value = '';
    document.getElementById('orderModal').classList.add('active');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
    currentEditOrderId = null;
}

function calcOrderTotal() {
    const qty = parseFloat(document.getElementById('orderQty').value) || 0;
    const price = parseFloat(document.getElementById('orderPrice').value) || 0;
    if (qty > 0 && price > 0) {
        document.getElementById('orderTotal').value = (qty * price).toFixed(2);
    }
}

function calcOrderQty() {
    const total = parseFloat(document.getElementById('orderTotal').value) || 0;
    const price = parseFloat(document.getElementById('orderPrice').value) || 0;
    if (total > 0 && price > 0) {
        document.getElementById('orderQty').value = (total / price).toFixed(8);
    }
}

function selectOrderCoin(id, symbol, image) {
    document.getElementById('orderCoinId').value = id;
    document.getElementById('orderCoinSearch').value = symbol;
    document.getElementById('orderCoinImg').value = image;
    document.getElementById('orderSearchResults').classList.remove('active');
    const c = findCoin(id);
    if (c && c.current_price) {
        document.getElementById('orderPrice').value = c.current_price;
        calcOrderTotal();
    }
}

function searchOrderCoins(query) {
    const results = document.getElementById('orderSearchResults');
    const q = query.toLowerCase().trim();
    if (!q) { results.classList.remove('active'); return; }
    const local = allCoins.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)).slice(0, 8);
    if (!local.length) {
        results.innerHTML = '<div class="search-loading">ничего не найдено</div>';
        results.classList.add('active');
        return;
    }
    results.innerHTML = local.map(c => '<div class="search-item" onclick="selectOrderCoin(' + "'" + c.id + "'" + ',' + "'" + c.symbol.toUpperCase() + "'" + ',' + "'" + c.image + "'" + ')"><img src="' + c.image + '" alt="" ><div><div style="font-weight:600">' + c.name + '</div><div style="font-size:11px;color:var(--text-3)">' + c.symbol.toUpperCase() + '</div></div></div>').join('');
    results.classList.add('active');
}

function saveOrder() {
    const coinId = document.getElementById('orderCoinId').value;
    if (!coinId) return alert('выберите монету из списка поиска');
    const symbol = (document.getElementById('orderCoinSearch').value || '').toUpperCase();
    const amount = parseFloat(document.getElementById('orderQty').value) || 0;
    const price = parseFloat(document.getElementById('orderPrice').value) || 0;
    const total = parseFloat(document.getElementById('orderTotal').value) || 0;
    if (amount <= 0 || price <= 0) return alert('укажите положительное количество и цену');

    const orderTotal = total > 0 ? total : amount * price;

    if (currentEditOrderId) {
        const order = orders.find(o => o.id === currentEditOrderId);
        if (order) {
            order.coinId = coinId;
            order.symbol = symbol;
            order.amount = amount;
            order.price = price;
            order.total = orderTotal;
        }
        currentEditOrderId = null;
    } else {
        const newOrder = {
            id: uid(),
            coinId,
            symbol,
            amount,
            price,
            total: orderTotal,
            status: 'active',
            created: Date.now()
        };
        let insertIndex = orders.length;
        for (let i = orders.length - 1; i >= 0; i--) {
            if (orders[i].symbol === symbol) {
                insertIndex = i + 1;
                break;
            }
        }
        orders.splice(insertIndex, 0, newOrder);
    }

    saveOrders();
    closeOrderModal();
    renderOrders();
}

function openEditOrderModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    currentEditOrderId = orderId;
    document.getElementById('orderModalTitle').textContent = 'изменить ордер — ' + order.symbol;
    document.getElementById('orderCoinId').value = order.coinId;
    document.getElementById('orderCoinSearch').value = order.symbol;
    document.getElementById('orderQty').value = order.amount;
    document.getElementById('orderPrice').value = order.price;
    document.getElementById('orderTotal').value = order.total || (order.amount * order.price);
    document.getElementById('orderModal').classList.add('active');
}

function delOrder(id) {
    if (confirm('удалить ордер?')) {
        orders = orders.filter(o => o.id !== id);
        saveOrders();
        renderOrders();
    }
}

function scrollToOrders(symbol) {
    const el = document.querySelector('[data-order-symbol="' + symbol + '"]');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.transition = 'box-shadow 0.3s';
        el.style.boxShadow = '0 0 0 2px var(--green)';
        setTimeout(() => { el.style.boxShadow = ''; }, 1500);
    }
}

// ============================================================
// ТРАНЗАКЦИИ
// ============================================================

function openTxModal(holdingId) {
    currentTxHoldingId = holdingId;
    const h = portfolio.find(x => x.id === holdingId);
    if (!h) return;
    document.getElementById('txModalTitle').textContent = 'транзакции — ' + h.symbol;
    renderTxList();
    document.getElementById('txModal').classList.add('active');
}

function closeTxModal() {
    document.getElementById('txModal').classList.remove('active');
    currentTxHoldingId = null;
    renderPortfolio();
}

function renderTxList() {
    const h = portfolio.find(x => x.id === currentTxHoldingId);
    const list = document.getElementById('txList');
    if (!h || !h.purchases || !h.purchases.length) {
        list.innerHTML = '<div style="color:var(--text-3);font-size:13px;">нет транзакций</div>';
        return;
    }
    list.innerHTML = h.purchases.map(p =>
        '<div class="tx-row"><span>' + p.date + '</span><span>' + (p.type === 'sell' ? '<span class="neg" style="font-weight:700;">−</span> ' : '<span class="pos" style="font-weight:700;">+</span> ') + p.amount + ' ' + h.symbol + '</span><span>$' + p.price + '</span><span>' + fmt$(p.amount * p.price) + '</span><div class="tx-actions"><button class="btn btn-sm" onclick="openEditPurchaseModal(\'' + p.id + '\')">изм</button><button class="btn btn-sm btn-danger" onclick="delTx(\'' + p.id + '\')">удл</button></div></div>'
    ).join('');
}

function openAddPurchaseModal() {
    const h = portfolio.find(x => x.id === currentTxHoldingId);
    if (!h) return;
    currentEditTxId = null;
    document.getElementById('modalTitle').textContent = 'добавить транзакцию — ' + h.symbol;
    document.getElementById('mCoinId').value = h.coinId;
    document.getElementById('mCoinSearch').value = h.symbol;
    document.getElementById('mCoinSearch').disabled = true;
    document.getElementById('mCoinImg').value = '';
    document.getElementById('mQty').value = '';
    document.getElementById('mPrice').value = '';
    document.getElementById('mDate').value = new Date().toISOString().split('T')[0];
    const buyRadio = document.querySelector('input[name="txType"][value="buy"]');
    if (buyRadio) buyRadio.checked = true;
    document.getElementById('mTarget').value = h.targetPrice || '';
    document.getElementById('mStop').value = h.stopLoss || '';
    document.getElementById('mNotes').value = h.notes || '';
    document.getElementById('mExistingHint').style.display = 'none';
    document.getElementById('modal').classList.add('active');
}

function openEditPurchaseModal(txId) {
    const h = portfolio.find(x => x.id === currentTxHoldingId);
    if (!h) return;
    const p = h.purchases.find(x => x.id === txId);
    if (!p) return;
    currentEditTxId = txId;
    document.getElementById('modalTitle').textContent = 'изменить транзакцию — ' + h.symbol;
    document.getElementById('mCoinId').value = h.coinId;
    document.getElementById('mCoinSearch').value = h.symbol;
    document.getElementById('mCoinSearch').disabled = true;
    document.getElementById('mCoinImg').value = '';
    document.getElementById('mQty').value = p.amount;
    document.getElementById('mPrice').value = p.price;
    document.getElementById('mDate').value = p.date;
    const typeRadio = document.querySelector('input[name="txType"][value="' + (p.type || 'buy') + '"]');
    if (typeRadio) typeRadio.checked = true;
    document.getElementById('mTarget').value = h.targetPrice || '';
    document.getElementById('mStop').value = h.stopLoss || '';
    document.getElementById('mNotes').value = h.notes || '';
    document.getElementById('mExistingHint').style.display = 'none';
    document.getElementById('modal').classList.add('active');
}

function delTx(txId) {
    const h = portfolio.find(x => x.id === currentTxHoldingId);
    if (!h) return;
    if (h.purchases.length <= 1) {
        if (!confirm('это последняя транзакция, удаление удалит всю позицию. продолжить?')) return;
        delHolding(h.id);
        closeTxModal();
        return;
    }
    if (!confirm('удалить транзакцию?')) return;
    h.purchases = h.purchases.filter(x => x.id !== txId);
    recalcRealizedPnl(h);
    recomputeHolding(h);
    savePortfolio();
    renderTxList();
    renderHeader();
}

function openModal() {
    document.getElementById('modalTitle').textContent = 'добавить покупку';
    document.getElementById('mCoinId').value = '';
    document.getElementById('mCoinSearch').value = '';
    document.getElementById('mCoinSearch').disabled = false;
    document.getElementById('mCoinImg').value = '';
    document.getElementById('mQty').value = '';
    document.getElementById('mPrice').value = '';
    document.getElementById('mDate').value = new Date().toISOString().split('T')[0];
    const buyRadio = document.querySelector('input[name="txType"][value="buy"]');
    if (buyRadio) buyRadio.checked = true;
    document.getElementById('mTarget').value = '';
    document.getElementById('mStop').value = '';
    document.getElementById('mNotes').value = '';
    document.getElementById('mExistingHint').style.display = 'none';
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('mCoinSearch').disabled = false;
    currentEditTxId = null;
}

function saveHolding() {
    const coinId = document.getElementById('mCoinId').value;
    if (!coinId) return alert('выберите монету из списка поиска');
    const c = findCoin(coinId);
    const symbol = (document.getElementById('mCoinSearch').value || (c ? c.symbol : '')).toUpperCase();
    const amount = parseFloat(document.getElementById('mQty').value) || 0;
    const price = parseFloat(document.getElementById('mPrice').value) || 0;
    const date = document.getElementById('mDate').value || new Date().toISOString().split('T')[0];
    const txTypeEl = document.querySelector('input[name="txType"]:checked');
    const txType = txTypeEl ? txTypeEl.value : 'buy';
    const target = parseFloat(document.getElementById('mTarget').value) || null;
    const stop = parseFloat(document.getElementById('mStop').value) || null;
    const notes = document.getElementById('mNotes').value || '';

    let h = portfolio.find(x => x.coinId === coinId);

    if (currentEditTxId && h) {
        const p = h.purchases.find(x => x.id === currentEditTxId);
        if (p) {
            if (amount > 0) p.amount = amount;
            if (price > 0) p.price = price;
            p.date = date;
            if (txType) p.type = txType;
            recalcRealizedPnl(h);
            recomputeHolding(h);
        }
        if (target !== null) h.targetPrice = target;
        if (stop !== null) h.stopLoss = stop;
        if (notes !== '') h.notes = notes;
        currentEditTxId = null;
        savePortfolio();
        closeModal();
        syncAutoAlertsFromAdvisor();
        renderAll();
        if (currentTxHoldingId) renderTxList();
        return;
    }

    if (amount > 0 && price > 0) {
        if (h) {
            h.purchases = h.purchases || [];
            if (txType === 'sell') {
                const canSell = h.amount;
                if (amount > canSell) return alert('нельзя продать больше чем есть (' + canSell.toFixed(6) + ')');
                h.purchases.push({ id: uid(), date, amount, price, type: 'sell', realizedPnl: amount * (price - h.avgPrice) });
                recordUserAction(h.id, 'sell', price, amount);
            } else {
                h.purchases.push({ id: uid(), date, amount, price, type: 'buy' });
                recordUserAction(h.id, 'buy', price, amount);
            }
            recalcRealizedPnl(h);
            recomputeHolding(h);
        } else {
            if (txType === 'sell') return alert('нельзя продать монету которой нет в портфеле');
            h = { id: uid(), coinId, symbol, amount, avgPrice: price, purchases: [{ id: uid(), date, amount, price, type: 'buy' }], targetPrice: null, stopLoss: null, notes: '', realizedPnl: 0 };
            portfolio.push(h);
            recordUserAction(h.id, 'buy', price, amount);
        }
    } else if (!h) {
        return alert('укажите количество и цену для новой монеты');
    }

    if (target) h.targetPrice = target;
    if (stop) h.stopLoss = stop;
    if (notes) h.notes = notes;

    savePortfolio();
    closeModal();
    syncAutoAlertsFromAdvisor();
    renderAll();
    if (currentTxHoldingId) renderTxList();
}

function delHolding(id) {
    if (confirm('удалить позицию целиком (все транзакции)?')) {
        portfolio = portfolio.filter(h => h.id !== id);
        alertsList = alertsList.filter(a => a.coinId_h !== id);
        delete expandedRows[id];
        savePortfolio();
        saveAlerts();
        renderAll();
    }
}

function recomputeHolding(h) {
    const buys = h.purchases.filter(p => p.type !== 'sell');
    const totalBuyAmount = buys.reduce((s, p) => s + p.amount, 0);
    const totalBuyCost = buys.reduce((s, p) => s + p.amount * p.price, 0);
    h.avgPrice = totalBuyAmount > 0 ? +(totalBuyCost / totalBuyAmount).toFixed(8) : 0;
    const totalAmount = h.purchases.reduce((s, p) => s + (p.type === 'sell' ? -p.amount : p.amount), 0);
    h.amount = Math.max(0, totalAmount);
}

function recalcRealizedPnl(h) {
    const sorted = [...h.purchases].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningAvg = 0;
    let runningQty = 0;
    let realized = 0;
    sorted.forEach(p => {
        if (p.type === 'sell') {
            const pnl = p.amount * (p.price - runningAvg);
            p.realizedPnl = pnl;
            realized += pnl;
            runningQty -= p.amount;
        } else {
            runningQty += p.amount;
            const cost = runningQty > p.amount ? runningAvg * (runningQty - p.amount) + p.amount * p.price : p.amount * p.price;
            runningAvg = runningQty > 0 ? cost / runningQty : 0;
        }
    });
    h.realizedPnl = realized;
}

// ============================================================
// ФИД ТРАНЗАКЦИЙ
// ============================================================

function renderFeed() {
    const list = document.getElementById('feedList');
    if (!list) return;
    let allTx = [];
    portfolio.forEach(h => {
        const c = findCoin(h.coinId || h.symbol.toLowerCase());
        if (!c) return;
        (h.purchases || []).forEach(p => {
            allTx.push({ ...p, symbol: h.symbol, name: c.name, image: c.image });
        });
    });
    allTx.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!allTx.length) {
        list.innerHTML = '<div style="color:var(--text-3);padding:20px;">нет транзакций</div>';
        return;
    }
    let html2 = '<div class="table-wrap"><table><thead><tr><th class="no-sort">дата</th><th class="no-sort">монета</th><th class="no-sort">тип</th><th class="no-sort">кол-во</th><th class="no-sort">цена</th><th class="no-sort">сумма</th><th class="no-sort">реализ. p&l</th></tr></thead><tbody>';
    allTx.forEach(tx => {
        const isSell = tx.type === 'sell';
        const typeClass = isSell ? 'neg' : 'pos';
        const typeText = isSell ? 'ПРОДАЖА' : 'ПОКУПКА';
        const pnlCell = (isSell && tx.realizedPnl) ? '<span class="' + (tx.realizedPnl >= 0 ? 'pos' : 'neg') + '">' + (tx.realizedPnl >= 0 ? '+' : '') + fmt$(tx.realizedPnl) + '</span>' : '—';
        html2 += '<tr><td>' + tx.date + '</td><td><div class="coin-cell"><div class="coin-img"><img src="' + tx.image + '" alt="" onerror="this.style.display=\'none\';this.parentNode.textContent=\'' + tx.symbol[0] + '\'"></div><div><div style="font-weight:600">' + tx.name + '</div><div class="coin-symbol">' + tx.symbol + '</div></div></div></td><td><span class="' + typeClass + '" style="font-weight:700;font-size:12px;">' + typeText + '</span></td><td>' + tx.amount + '</td><td>' + fmt$(tx.price) + '</td><td>' + fmt$(tx.amount * tx.price) + '</td><td>' + pnlCell + '</td></tr>';
    });
    html2 += '</tbody></table></div>';
    list.innerHTML = html2;
}

// ============================================================
// ГРАФИКИ
// ============================================================

function openChartModal(coinId, symbol) {
    currentChartCoin = coinId;
    document.getElementById('chartModalTitle').textContent = 'график — ' + symbol;
    document.getElementById('chartModal').classList.add('active');
    loadCoinChart(coinId, 30);
}

function closeChartModal() {
    document.getElementById('chartModal').classList.remove('active');
    currentChartCoin = null;
}

async function loadCoinChart(coinId, days, attempt) {
    if (!coinId) return;
    attempt = attempt || 1;
    const loading = document.getElementById('chartLoading');
    if (loading) loading.textContent = 'загрузка графика' + (attempt > 1 ? ' (попытка ' + attempt + ')' : '') + '...';
    try {
        const res = await fetch(`${API_BASE}?path=coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
        if (res.status === 429) {
            if (attempt < 3) { await new Promise(r => setTimeout(r, 1500 * attempt)); return loadCoinChart(coinId, days, attempt + 1); }
            if (loading) loading.textContent = 'Временное ограничение запросов. Подождите минуту.';
            return;
        }
        if (res.status === 404) {
            if (loading) loading.textContent = 'у CoinGecko нет исторических данных для этой монеты.';
            return;
        }
        if (!res.ok) throw new Error('chart fetch failed: ' + res.status);
        const data = await res.json();
        const prices = data.prices || [];
        if (!prices.length) {
            if (loading) loading.textContent = 'нет данных для выбранного периода.';
            return;
        }
        drawRealChart(prices);
        if (loading) loading.textContent = '';
    } catch (e) {
        if (attempt < 3) { await new Promise(r => setTimeout(r, 1000 * attempt)); return loadCoinChart(coinId, days, attempt + 1); }
        if (loading) loading.textContent = 'не удалось загрузить график: ' + (e.message || 'сетевая ошибка') + '. Попробуйте другой период или повторите позже.';
    }
}

function drawRealChart(prices) {
    const canvas = document.getElementById('realChartCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth || 600;
    const h = canvas.height = 320;
    ctx.clearRect(0, 0, w, h);
    if (!prices.length) return;
    const values = prices.map(p => p[1]);
    const min = Math.min(...values),
        max = Math.max(...values);
    const range = max - min || 1;
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = 20 + (i / 4) * (h - 40);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
    const up = values[values.length - 1] >= values[0];
    ctx.beginPath();
    ctx.moveTo(0, h - 20 - ((values[0] - min) / range) * (h - 40));
    values.forEach((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - 20 - ((v - min) / range) * (h - 40);
        ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fillStyle = up ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)';
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = up ? '#22c55e' : '#ef4444';
    ctx.lineWidth = 2;
    values.forEach((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - 20 - ((v - min) / range) * (h - 40);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.fillText('$' + max.toLocaleString(undefined, { maximumFractionDigits: 2 }), 8, 14);
    ctx.fillText('$' + min.toLocaleString(undefined, { maximumFractionDigits: 2 }), 8, h - 4);
}

// ============================================================
// ПОИСК МОНЕТ
// ============================================================

function searchCoins(query) {
    const results = document.getElementById('searchResults');
    if (!results) return; // ВАЖНО: Проверяем наличие элемента

    const q = query.toLowerCase().trim();
    if (!q) { results.classList.remove('active'); return; }

    const local = allCoins.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)).slice(0, 8);
    renderSearchResults(local, true);

    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(async () => {
        try {
            // Отключаем поиск из-за CORS/429 проблем - используем только локальные данные
            const remote = [];
            const local = allCoins.filter(c => 
                c.name.toLowerCase().includes(q.toLowerCase()) || 
                c.symbol.toLowerCase().includes(q.toLowerCase())
            ).slice(0, 12).map(c => ({ id: c.id, name: c.name, symbol: c.symbol, image: c.image }));
            const localIds = new Set(local.map(c => c.id));
            const merged = local.concat(remote.filter(c => !localIds.has(c.id)));
            renderSearchResults(merged.slice(0, 12), false);
        } catch (e) {}
    }, 350);
}

function renderSearchResults(list, loadingMore) {
    const results = document.getElementById('searchResults');
    if (!list.length) {
        results.innerHTML = loadingMore ? '<div class="search-loading">ищем на CoinGecko...</div>' : '<div class="search-loading">ничего не найдено</div>';
        results.classList.add('active');
        return;
    }
    results.innerHTML = list.map(c =>
        '<div class="search-item" onclick="selectCoin(\'' + c.id + '\',\'' + (c.symbol || '').toUpperCase() + '\',\'' + (c.image || '') + '\')"><img src="' + (c.image || '') + '" alt="" ><div><div style="font-weight:600">' + c.name + '</div><div style="font-size:11px;color:var(--text-3)">' + (c.symbol || '').toUpperCase() + '</div></div></div>'
    ).join('') + (loadingMore ? '<div class="search-loading">ищем ещё на CoinGecko...</div>' : '');
    results.classList.add('active');
}

function selectCoin(id, symbol, image) {
    document.getElementById('mCoinId').value = id;
    document.getElementById('mCoinSearch').value = symbol;
    document.getElementById('mCoinImg').value = image;
    document.getElementById('searchResults').classList.remove('active');

    const hint = document.getElementById('mExistingHint');
    const existing = portfolio.find(h => h.coinId === id);
    if (existing) {
        hint.style.display = 'block';
        hint.innerHTML = 'У вас уже есть <strong>' + existing.amount + ' ' + existing.symbol + '</strong> (средняя $' + existing.avgPrice + '). Эта покупка добавится к существующей позиции, средняя цена пересчитается.';
    } else {
        hint.style.display = 'none';
    }

    if (!findCoin(id)) {
        fetchExtraCoinFull(id, symbol, image);
    }
}

async function fetchExtraCoinFull(id, symbol, image) {
    // Отключаем API запросы из-за CORS/429 проблем - используем только кэш
    try { 
        const cached = JSON.parse(localStorage.getItem('ct_extra_coins') || '{}'); 
        if (cached[id]) { 
            extraCoins[id] = cached[id]; 
            return true; 
        } 
    } catch (e) {}
    return false;
}

// ============================================================
// ЭКСПОРТ / ИМПОРТ ДАННЫХ
// ============================================================

function exportData() {
    const data = { portfolio, notifications, alerts: alertsList, orders, exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crypto-portfolio-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
        try {
            const data = JSON.parse(ev.target.result);
            if (data.portfolio) {
                portfolio = data.portfolio;
                await savePortfolio();
            }
            if (data.notifications) {
                notifications = data.notifications;
                await saveNotifs();
            }
            if (data.alerts) {
                alertsList = data.alerts;
                await saveAlerts();
            }
            if (data.orders) {
                orders = data.orders;
                await saveOrders();
            }
            syncAutoAlertsFromAdvisor();
            renderAll();
            alert('данные импортированы и сохранены в Firebase');
        } catch (err) {
            console.error('Import error:', err);
            alert('ошибка импорта: ' + err.message);
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

// ============================================================
// КОЛЛАПСИБЛЫ
// ============================================================

function toggleSection(id) {
    const content = document.getElementById(id);
    const toggle = document.getElementById(id + '-toggle');
    if (!content) return;
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        if (toggle) toggle.textContent = '▼';
        content.style.maxHeight = '20000px';
        content.style.opacity = '1';
        content.style.paddingTop = '16px';
    } else {
        content.classList.add('collapsed');
        if (toggle) toggle.textContent = '▶';
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        content.style.paddingTop = '0 !important';
    }
}

// ============================================================
// ПЕРЕКЛЮЧЕНИЕ ТЕМ
// ============================================================

function switchTheme(theme) {
    document.body.className = 'theme-' + theme;
    localStorage.setItem('ct_theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
        if (btn.classList.contains('active')) {
            btn.style.background = 'var(--green-dim)';
            btn.style.color = 'var(--green)';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--text-muted)';
        }
    });
}

(function loadTheme() {
    const saved = localStorage.getItem('ct_theme') || 'glass';
    switchTheme(saved);
})();

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        switchTheme(this.dataset.theme);
    });
});

// ============================================================
// ПАТЧ ДЛЯ PER-COIN-STATS-BOX
// ============================================================

(function() {
    function wrapPerCoinRows(root) {
        (root || document).querySelectorAll('.per-coin-card').forEach(function(card) {
            if (card.querySelector('.per-coin-stats-box')) return;

            var header = card.querySelector('.per-coin-header');
            if (!header) return;

            var rows = [];
            var el = header.nextElementSibling;
            while (el && el.classList && el.classList.contains('per-coin-row')) {
                rows.push(el);
                el = el.nextElementSibling;
            }
            if (!rows.length) return;

            var box = document.createElement('div');
            box.className = 'per-coin-stats-box';

            header.parentNode.insertBefore(box, rows[0]);
            rows.forEach(function(row) { box.appendChild(row); });
        });
    }

    function run() {
        wrapPerCoinRows(document);
    }

    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(run, 300);
    });

    ['renderOrders', 'renderAll'].forEach(function(fnName) {
        var orig = window[fnName];
        if (typeof orig === 'function') {
            window[fnName] = function() {
                var result = orig.apply(this, arguments);
                setTimeout(run, 30);
                return result;
            };
        }
    });

    var target = document.getElementById('globalOrdersImpact');
    if (target && window.MutationObserver) {
        var mo = new MutationObserver(function() { run(); });
        mo.observe(target, { childList: true, subtree: true });
    }
})();

// ============================================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================================

function init() {
    loadPortfolio();
    loadNotifs();
    loadAlerts();
    loadAutoAlertSettings();
    loadOrders(); // Загружаем ордера сразу

    setupTabs();
    setupSearchClose();
    try { const cached = JSON.parse(localStorage.getItem('ct_extra_coins') || '{}');
        Object.assign(extraCoins, cached); } catch (e) {}
    ensureNotificationPermission();

    if (window.firebaseReady) {
        updateAuthUI();
    }

    const savedView = localStorage.getItem('ct_portfolio_view_mode');
    if (savedView && (savedView === 'table' || savedView === 'cards')) {
        portfolioViewMode = savedView;
    }
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === portfolioViewMode);
    });

    fetchAll();
    setInterval(fetchAll, 60000);

    // ИСПРАВЛЕНИЕ: Используем правильный паттерн ожидания Firebase
    function attemptAuthSetup() {
        if (window.auth) {
            window.auth.onAuthStateChanged(function(user) {
                currentUser = user;
                window.currentUser = user;
                
                // Обновляем UI
                if (typeof window.updateAuthUI === 'function') window.updateAuthUI();
                if (typeof window.syncAuth === 'function') window.syncAuth();

                if (user) {
                    // Перезагружаем ВСЕ данные, включая ордера, при входе в аккаунт
                    loadPortfolio();
                    loadNotifs();
                    loadAlerts();
                    loadOrders(); // ВАЖНО: Загружаем ордера при авторизации
                    renderAll();
                } else {
                    // Если вышел - загружаем из localStorage
                    loadPortfolio();
                    loadNotifs();
                    loadAlerts();
                    loadOrders();
                    renderAll();
                }
            });
        } else {
            // Если auth еще не готов, пробуем через 500 мс
            setTimeout(attemptAuthSetup, 500);
        }
    }
    
    // Запускаем попытку подключения
    attemptAuthSetup();

    // Подписка на события изменения языка из languages.js
    document.addEventListener('languageChanged', function() {
        if (typeof updateAllTranslations === 'function') {
            updateAllTranslations();
        }
    });
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const panel = document.getElementById('panel-' + btn.dataset.tab);
            if (panel) panel.classList.add('active');
            if (btn.dataset.tab === 'advisor') renderAdvisor();
            if (btn.dataset.tab === 'dca') initDCA();
            if (btn.dataset.tab === 'feed') renderFeed();
        });
    });
}

function setupSearchClose() {
    document.addEventListener('click', e => {
        if (!e.target.closest('.search-wrap')) {
            const searchResults = document.getElementById('searchResults');
            if (searchResults) searchResults.classList.remove('active');
            const orderSearchResults = document.getElementById('orderSearchResults');
            if (orderSearchResults) orderSearchResults.classList.remove('active');
        }
        if (!e.target.closest('.notif-bell')) {
            const notifDropdown = document.getElementById('notifDropdown');
            if (notifDropdown) notifDropdown.classList.remove('active');
        }
    });
}

// Запуск при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
// ============================================================
// ГЛОБАЛЬНЫЕ ЭКСПОРТЫ
// ============================================================

// Экспортируем функции для использования в HTML
window.toggleNotif = toggleNotif;
window.openModal = openModal;
window.closeModal = closeModal;
window.saveHolding = saveHolding;
window.openTxModal = openTxModal;
window.closeTxModal = closeTxModal;
window.openAddPurchaseModal = openAddPurchaseModal;
window.openEditPurchaseModal = openEditPurchaseModal;
window.delTx = delTx;
window.openChartModal = openChartModal;
window.closeChartModal = closeChartModal;
window.loadCoinChart = loadCoinChart;
window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.saveOrder = saveOrder;
window.openEditOrderModal = openEditOrderModal;
window.delOrder = delOrder;
window.executeOrder = executeOrder;
window.changeOrderStatus = changeOrderStatus;
window.setOrderFilter = setOrderFilter;
window.exportData = exportData;
window.importData = importData;
window.filterPortfolio = filterPortfolio;
window.sortPortfolio = sortPortfolio;
window.setPortfolioViewMode = setPortfolioViewMode;
window.toggleAdviceRow = toggleAdviceRow;
window.toggleDcaCalculator = toggleDcaCalculator;
window.updateDcaAmount = updateDcaAmount;
window.updateDcaQuantity = updateDcaQuantity;
window.updateDcaPrice = updateDcaPrice;
window.filterMarket = filterMarket;
window.sortMarket = sortMarket;
window.searchCoins = searchCoins;
window.searchOrderCoins = searchOrderCoins;
window.selectCoin = selectCoin;
window.selectOrderCoin = selectOrderCoin;
window.toggleSection = toggleSection;
window.setAdvisorFilter = setAdvisorFilter;
window.toggleAutoAlerts = toggleAutoAlerts;
window.toggleOthersList = toggleOthersList;
window.switchTheme = switchTheme;
window.clearNotifications = clearNotifications;
window.updateDCA = updateDCA;
window.calcDCA = calcDCA;
window.renderAll = renderAll;
console.log('📊 Crypto Portfolio Tracker Pro initialized');
window.searchOrderCoins = searchOrderCoins;
window.selectCoin = selectCoin;
window.selectOrderCoin = selectOrderCoin;
window.toggleSection = toggleSection;
window.setAdvisorFilter = setAdvisorFilter;
window.toggleAutoAlerts = toggleAutoAlerts;
window.toggleOthersList = toggleOthersList;
window.switchTheme = switchTheme;
window.clearNotifications = clearNotifications;
window.updateDCA = updateDCA;
window.calcDCA = calcDCA;
window.renderAll = renderAll;
console.log('📊 Crypto Portfolio Tracker Pro initialized');
