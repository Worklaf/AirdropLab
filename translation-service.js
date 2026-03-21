// ============================================
// ВЕБ-СЕРВИС ПЕРЕВОДА КРАНОВ
// С ИСПОЛЬЗОВАНИЕМ БЕСПЛАТНОЙ LLM МОДЕЛИ
// ============================================

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// CORS КОНФИГУРАЦИЯ
// ============================================

app.use(cors({
  origin: ['http://localhost:3000', 'https://airdroplab.org', 'http://127.0.0.1:5500', 'file://'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Кэш переводов
let translationCache = {};
const CACHE_FILE = path.join(__dirname, 'faucet-cache.json');

// ============================================
// ЗАГРУЗКА КЭША
// ============================================

async function loadCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, 'utf-8');
    translationCache = JSON.parse(data);
    console.log(`✅ Cache loaded: ${Object.keys(translationCache).length} entries`);
  } catch (error) {
    translationCache = {};
    console.log('⚠️ Cache file not found, starting fresh');
  }
}

async function saveCache() {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(translationCache, null, 2), 'utf-8');
    console.log(`💾 Cache saved: ${Object.keys(translationCache).length} entries`);
  } catch (error) {
    console.error('❌ Failed to save cache:', error.message);
  }
}

function createCacheKey(text, sourceLang, targetLang) {
  return crypto.createHash('md5')
    .update(`${text}:${sourceLang}:${targetLang}`)
    .digest('hex');
}

// ============================================
// БАЗОВЫЕ ПЕРЕВОДЫ (fallback)
// ============================================

const basicTranslations = {
  // Время и кулдауны
  '24ч': '24h',
  '8ч': '8h', 
  'при регистрации': 'on registration',
  'нет': 'none',
  'неограниченно': 'unlimited',
  
  // Награды
  '0.5 sETH/день': '0.5 sETH/day',
  '0.1 gETH/день': '0.1 gETH/day',
  '0.5 ETH/день': '0.5 ETH/day',
  '2 MATIC/день': '2 MATIC/day',
  '0.3 BNB/день': '0.3 BNB/day',
  '1 MON/день': '1 MON/day',
  '0.01 ETH': '0.01 ETH',
  '0.5 MNT': '0.5 MNT',
  '2 AVAX/день': '2 AVAX/day',
  '1 FTM': '1 FTM',
  '0.5 BERA': '0.5 BERA',
  '200 NEAR': '200 NEAR',
  '1000 ADA': '1000 ADA',
  '10 ALGO': '10 ALGO',
  '5 CELO': '5 CELO',
  '20 LINK': '20 LINK',
  '10 FLOW': '10 FLOW',
  '0.01 xDAI': '0.01 xDAI',
  '1 APT': '1 APT',
  '1 SUI': '1 SUI',
  '2 SOL': '2 SOL',
  '5 tTON': '5 tTON',
  '1000 XRP': '1000 XRP',
  '500 STX': '500 STX',
  '5 KLAY': '5 KLAY',
  
  // Платные тарифы
  '24ч free / нет paid': '24h free / no paid',
  'до 1 ETH': 'up to 1 ETH',
  'до 5 ETH/день': 'up to 5 ETH/day',
  'неограниченно': 'unlimited',
  
  // Технические термины
  'Краны': 'Faucets',
  'тестнет': 'testnet',
  'мейннет': 'mainnet',
  'бесплатных': 'free',
  'платных': 'paid',
  'Для разработки': 'For development',
  'Для тестирования': 'For testing',
  'Официальный': 'Official',
  'Активная экосистема': 'Active ecosystem',
  'Требует': 'Requires',
  'аккаунт': 'account',
  'верификации': 'verification',
  'Поддерживает': 'Supports',
  'мультикран': 'multi-faucet',
  'Discord-бот': 'Discord bot',
  'ветке': 'channel',
  'отправь': 'send',
  'адрес': 'address',
  'zkEVM L2': 'zkEVM L2',
  'Нужен': 'Needed for',
  'контрактов': 'contracts',
  'Активная сеть': 'Active network',
  'потенциальным аирдропом': 'with potential airdrop',
  'Хорошо': 'Good for',
  'on-chain активности': 'on-chain activity',
  'от ConsenSys': 'from ConsenSys',
  'MetaMask': 'MetaMask',
  'ожидается аирдроп': 'airdrop expected',
  'Высокопроизводительный': 'High-performance',
  'один из самых ожидаемых': 'one of most anticipated',
  'Активность засчитывается': 'Activity counts',
  'Взаимодействие': 'Interaction',
  'учитываться': 'may count',
  'будущих аирдропов': 'for future airdrops',
  'от Matter Labs': 'from Matter Labs',
  'Portal zkSync': 'Portal zkSync',
  'официальный кран': 'official faucet',
  'Активность в тестнете важна': 'Testnet activity is important',
  'Выдаёт': 'Issues',
  'тестовые': 'test',
  'разработки': 'development',
  'Несколько': 'Several',
  'партнёрских': 'partner',
  'мобильной блокчейн-платформы': 'mobile blockchain platform',
  'с фокусом на': 'focused on',
  'Tree-Graph консенсус': 'Tree-Graph consensus',
  'Высокая пропускная способность': 'High throughput',
  'блокчейн для IoT устройств': 'Blockchain for IoT devices',
  'Децентрализованное архивирование': 'Decentralized archiving',
  'через приложение': 'via app',
  'Гейминг-фокусированный': 'Gaming-focused',
  'через официальный Hub': 'via official Hub',
  'NFT-фокусированный': 'NFT-focused',
  'на базе Arbitrum': 'based on Arbitrum',
  'Privacy-oriented': 'Privacy-oriented',
  'Тестнет с': 'Testnet with',
  'Разработан': 'Developed by',
  'Шардированный блокчейн': 'Sharded blockchain',
  'через официальный dev-кошелёк': 'via official dev wallet',
  'Профессиональный провайдер': 'Professional provider',
  'Бесплатный tier': 'Free tier',
  'для новых пользователей': 'for new users',
  'Платный доступ': 'Paid access',
  'снимает лимиты': 'removes limits',
  'Требует регистрацию': 'Requires registration',
  'Инструмент для разработчиков': 'Developer tool',
  'Виртуальные тестнеты': 'Virtual testnets',
  'с неограниченными токенами': 'with unlimited tokens',
  'Надёжный и стабильный провайдер': 'Reliable and stable provider',
  'от Infura': 'from Infura'
};

// ============================================
// ФУНКЦИЯ ПЕРЕВОДА
// ============================================

function translateText(text, sourceLang, targetLang) {
  // Сначала проверяем базовые переводы
  if (basicTranslations[text]) {
    return basicTranslations[text];
  }
  
  // Затем проверяем кэш
  const cacheKey = createCacheKey(text, sourceLang, targetLang);
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey].translation;
  }
  
  // Для сложных текстов используем простые правила
  let translated = text;
  
  // Базовые замены
  const replacements = [
    // Технические термины
    { from: /тестнет/g, to: 'testnet' },
    { from: /мейннет/g, to: 'mainnet' },
    { from: /кран/g, to: 'faucet' },
    { from: /нода/g, to: 'node' },
    { from: /блокчейн/g, to: 'blockchain' },
    { from: /смарт-контракт/g, to: 'smart contract' },
    { from: /кошелёк|кошелек/g, to: 'wallet' },
    { from: /мост/g, to: 'bridge' },
    { from: /обмен/g, to: 'swap' },
    { from: /аирдроп/g, to: 'airdrop' },
    { from: /стейкинг/g, to: 'staking' },
    { from: /фарминг/g, to: 'farming' },
    { from: /минт/g, to: 'mint' },
    { from: /деплой/g, to: 'deploy' },
    { from: /DeFi|DeFi/g, to: 'DeFi' },
    { from: /GameFi|GameFi/g, to: 'GameFi' },
    { from: /SocialFi|SocialFi/g, to: 'SocialFi' },
    { from: /DePIN|DePIN/g, to: 'DePIN' },
    
    // Время и периоды
    { from: /24ч/g, to: '24h' },
    { from: /8ч/g, to: '8h' },
    { from: /день/g, to: 'day' },
    { from: /при регистрации/g, to: 'on registration' },
    { from: /нет лимита/g, to: 'no limit' },
    { from: /неограниченно/g, to: 'unlimited' },
    
    // Действия
    { from: /Для разработки/g, to: 'For development' },
    { from: /Для тестирования/g, to: 'For testing' },
    { from: /Требует/g, to: 'Requires' },
    { from: /Поддерживает/g, to: 'Supports' },
    { from: /Выдаёт/g, to: 'Issues' },
    { from: /Разработан/g, to: 'Developed by' },
    
    // Компании и платформы
    { from: /MetaMask/g, to: 'MetaMask' },
    { from: /ConsenSys/g, to: 'ConsenSys' },
    { from: /Matter Labs/g, to: 'Matter Labs' },
    { from: /Infura/g, to: 'Infura' },
    
    // Описания экосистем
    { from: /Активная экосистема/g, to: 'Active ecosystem' },
    { from: /Активная сеть/g, to: 'Active network' },
    { from: /Высокопроизводительный/g, to: 'High-performance' },
    { from: /Высокая пропускная способность/g, to: 'High throughput' },
    
    // Типы сетей
    { from: /L2|Layer 2/g, to: 'L2' },
    { from: /zkEVM/g, to: 'zkEVM' },
    { from: /EVM/g, to: 'EVM' },
    
    // Действия пользователей
    { from: /Хорошо для/g, to: 'Good for' },
    { from: /Активность засчитывается/g, to: 'Activity counts' },
    { from: /Взаимодействие может учитываться/g, to: 'Interaction may count' }
  ];
  
  // Применяем замены
  replacements.forEach(({ from, to }) => {
    translated = translated.replace(from, to);
  });
  
  // Сохраняем в кэш
  translationCache[cacheKey] = {
    original: text,
    translation: translated,
    timestamp: new Date().toISOString()
  };
  
  return translated;
}

// ============================================
// API ENDPOINTS
// ============================================

// Главная страница
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Faucet Translation Service</title>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; text-align: center; }
            .endpoint { background: #e8f4fd; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2196f3; }
            .method { background: #f0f0f0; padding: 10px; margin: 5px 0; border-radius: 3px; font-family: monospace; }
            .stats { background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌐 Faucet Translation Service</h1>
            <div class="endpoint">
                <h3>📡 Translation Endpoint</h3>
                <p><strong>POST /translate</strong></p>
                <div class="method">
POST /translate
Content-Type: application/json

{
  "text": "Краны Bitcoin тестовой сети",
  "sourceLang": "ru",
  "targetLang": "en"
}
                </div>
            </div>
            <div class="stats">
                <h3>📊 Current Stats</h3>
                <p>Cache entries: ${Object.keys(translationCache).length}</p>
                <p>Basic translations: ${Object.keys(basicTranslations).length}</p>
                <p>Status: 🟢 Online</p>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Endpoint для перевода
app.post('/translate', (req, res) => {
  try {
    const { text, sourceLang = 'ru', targetLang = 'en' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const translated = translateText(text, sourceLang, targetLang);
    
    res.json({
      original: text,
      translated: translated,
      sourceLang,
      targetLang,
      method: 'basic-rules',
      cached: translationCache[createCacheKey(text, sourceLang, targetLang)] ? true : false
    });
    
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Endpoint для пакетного перевода кранов
app.post('/translate-faucets', (req, res) => {
  try {
    const { faucets, sourceLang = 'ru', targetLang = 'en' } = req.body;
    
    if (!Array.isArray(faucets)) {
      return res.status(400).json({ error: 'Faucets array is required' });
    }
    
    const translatedFaucets = faucets.map(faucet => ({
      ...faucet,
      desc: translateText(faucet.desc || '', sourceLang, targetLang),
      reward: translateText(faucet.reward || '', sourceLang, targetLang),
      cooldown: translateText(faucet.cooldown || '', sourceLang, targetLang)
    }));
    
    res.json({
      faucets: translatedFaucets,
      sourceLang,
      targetLang,
      count: translatedFaucets.length
    });
    
  } catch (error) {
    console.error('Batch translation error:', error);
    res.status(500).json({ error: 'Batch translation failed' });
  }
});

// Endpoint для получения статистики
app.get('/stats', (req, res) => {
  res.json({
    cacheEntries: Object.keys(translationCache).length,
    basicTranslations: Object.keys(basicTranslations).length,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    status: 'online'
  });
});

// Очистка кэша
app.post('/clear-cache', (req, res) => {
  translationCache = {};
  saveCache();
  res.json({ message: 'Cache cleared' });
});

// ============================================
// ЗАПУСК СЕРВЕРА
// ============================================

async function start() {
  await loadCache();
  
  app.listen(PORT, () => {
    console.log(`🚀 Translation server running on port ${PORT}`);
    console.log(`📡 Translation endpoint: http://localhost:${PORT}/translate`);
    console.log(`📊 Stats endpoint: http://localhost:${PORT}/stats`);
    console.log(`🌐 Web interface: http://localhost:${PORT}`);
  });
}

// Автосохранение кэша каждые 5 минут
setInterval(saveCache, 5 * 60 * 1000);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await saveCache();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await saveCache();
  process.exit(0);
});

start();
