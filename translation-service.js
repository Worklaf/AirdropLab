const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Импортируем Groq SDK
const Groq = require('groq-sdk');

const app = express();
const PORT = 3003;
const CACHE_FILE = path.join(__dirname, 'faucet-cache.json');

// Инициализация Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'gsk_dummy_key' // Заглушка если нет API ключа
});

// Включаем CORS для faucet.html
app.use(cors({
  origin: ['http://localhost:3000', 'https://airdroplab.org', 'http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:3002', 'file://'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Загружаем кэш переводов
let translationCache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    translationCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log('📂 Translation cache loaded');
  } catch (e) {
    console.warn('⚠️ Cache file corrupted, starting fresh');
    translationCache = {};
  }
}

// Сохраняем кэш
function saveCache() {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(translationCache, null, 2));
  } catch (e) {
    console.warn('⚠️ Failed to save cache:', e.message);
  }
}

// Базовые крипто-термины для улучшения переводов
const cryptoTerms = {
  ru: {
    'кран': 'faucet',
    'краны': 'faucets',
    'блокчейн': 'blockchain',
    'блокчейна': 'blockchain',
    'кошелек': 'wallet',
    'кошелька': 'wallet',
    'кошельке': 'wallet',
    'кошёлёк': 'wallet',
    'токен': 'token',
    'токена': 'token',
    'токену': 'token',
    'токены': 'tokens',
    'тестнет': 'testnet',
    'мейннет': 'mainnet',
    'шардированный': 'sharded',
    'шардинг': 'sharding',
    'смарт-контракт': 'smart contract',
    'смарт контракта': 'smart contract',
    'смарт-контракта': 'smart contract',
    'децентрализованный': 'decentralized',
    'децентрализованная': 'decentralized',
    'стейкинг': 'staking',
    'валидатор': 'validator',
    'нода': 'node',
    'узел': 'node',
    'транзакция': 'transaction',
    'транзакции': 'transactions',
    'газ': 'gas',
    'комиссия': 'fee',
    'комиссии': 'fees',
    'майнинг': 'mining',
    'майнер': 'miner',
    'дев': 'dev',
    'dev-кошелек': 'dev wallet',
    'dev-кошелька': 'dev wallet',
    'dev-кошельке': 'dev wallet',
    'тестовый': 'test',
    'тестовая': 'test',
    'тестовое': 'test',
    'официальный': 'official',
    'официальная': 'official',
    'официальное': 'official',
    'бесплатный': 'free',
    'бесплатная': 'free',
    'бесплатное': 'free',
    'платный': 'paid',
    'платная': 'paid',
    'платное': 'paid',
    'награда': 'reward',
    'награды': 'rewards',
    'кулдаун': 'cooldown',
    'ожидание': 'wait',
    'поддержка': 'support',
    'сеть': 'network',
    'сети': 'network',
    'протокол': 'protocol',
    'платформа': 'platform',
    'приложение': 'application',
    'сервис': 'service',
    'проект': 'project'
  },
  en: {
    'faucet': 'кран',
    'faucets': 'краны',
    'blockchain': 'блокчейн',
    'wallet': 'кошелек',
    'token': 'токен',
    'tokens': 'токены',
    'testnet': 'тестнет',
    'mainnet': 'мейннет',
    'sharded': 'шардированный',
    'sharding': 'шардинг',
    'smart contract': 'смарт-контракт',
    'decentralized': 'децентрализованный',
    'staking': 'стейкинг',
    'validator': 'валидатор',
    'node': 'нода',
    'transaction': 'транзакция',
    'transactions': 'транзакции',
    'gas': 'газ',
    'fee': 'комиссия',
    'fees': 'комиссии',
    'mining': 'майнинг',
    'miner': 'майнер',
    'dev': 'дев',
    'dev wallet': 'dev-кошелек',
    'test': 'тестовый',
    'official': 'официальный',
    'free': 'бесплатный',
    'paid': 'платный',
    'reward': 'награда',
    'rewards': 'награды',
    'cooldown': 'кулдаун',
    'wait': 'ожидание',
    'support': 'поддержка',
    'network': 'сеть',
    'protocol': 'протокол',
    'platform': 'платформа',
    'application': 'приложение',
    'service': 'сервис',
    'project': 'проект'
  }
};

// Функция перевода с использованием Groq LLM
async function translateWithGroq(text, sourceLang, targetLang) {
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'gsk_dummy_key') {
    console.log('⚠️ Groq API key not configured, using fallback');
    return null;
  }

  try {
    const systemPrompt = `You are an expert translator specializing in cryptocurrency and blockchain content.
Translate from ${sourceLang.toUpperCase()} to ${targetLang.toUpperCase()} with NATIVE-LEVEL FLUENCY.

CRITICAL RULES:
1. Keep exact: Token symbols ($ETH, $SOL), tech acronyms (NFT, DeFi, DAO), platform names (Ethereum, Solana)
2. Translate crypto terms correctly: "кран" → "faucet", "нода" → "node", "тестнет" → "testnet"
3. Preserve formatting: markdown, links, line breaks
4. Return ONLY the translation - no explanations

CRYPTO GLOSSARY:
- кран/краны → faucet/faucets
- тестнет → testnet
- мейннет → mainnet
- нода → node
- стейкинг → staking
- смарт-контракт → smart contract
- аирдроп → airdrop
- мост → bridge
- свап → swap
- холд → hold`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 1000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ]
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.warn('Groq API error:', error.message);
    return null;
  }
}

// Улучшенная функция перевода с LLM
function translateWithCryptoTerms(text, sourceLang, targetLang) {
  if (!text || text.trim() === '') return '';
  
  const cacheKey = `${sourceLang}-${targetLang}-${text}`;
  if (translationCache[cacheKey]) {
    console.log(`📋 Cache hit for: "${text}"`);
    return translationCache[cacheKey];
  }
  
  let result = text;
  
  // Сначала заменяем крипто-термины
  const terms = cryptoTerms[sourceLang] || {};
  const targetTerms = cryptoTerms[targetLang] || {};
  
  // Заменяем известные крипто-термины
  for (const [sourceTerm, targetTerm] of Object.entries(terms)) {
    const regex = new RegExp(sourceTerm, 'gi');
    result = result.replace(regex, targetTerm);
  }
  
  // Если текст не изменился, используем базовый перевод
  if (result === text) {
    result = basicTranslation(text, sourceLang, targetLang);
  }
  
  // Сохраняем в кэш
  translationCache[cacheKey] = result;
  saveCache();
  
  console.log(`🔄 Translated: "${text}" → "${result}"`);
  return result;
}

// Основная функция перевода с поддержкой LLM
async function translateWithLLM(text, sourceLang, targetLang) {
  if (!text || text.trim() === '') return '';
  
  const cacheKey = `${sourceLang}-${targetLang}-${text}`;
  if (translationCache[cacheKey]) {
    console.log(`📋 Cache hit for: "${text}"`);
    return translationCache[cacheKey];
  }
  
  let result = text;
  
  // Сначала пробуем LLM если доступен
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'gsk_dummy_key') {
    console.log(`🤖 Using Groq LLM for translation...`);
    const llmResult = await translateWithGroq(text, sourceLang, targetLang);
    if (llmResult) {
      result = llmResult;
    } else {
      // Fallback к базовому переводу
      result = translateWithCryptoTerms(text, sourceLang, targetLang);
    }
  } else {
    // Используем базовый перевод
    result = translateWithCryptoTerms(text, sourceLang, targetLang);
  }
  
  // Сохраняем в кэш
  translationCache[cacheKey] = result;
  saveCache();
  
  console.log(`🔄 Translated: "${text}" → "${result}"`);
  return result;
}

// Базовая функция перевода (улучшенная с правильным порядком)
function basicTranslation(text, sourceLang, targetLang) {
  if (sourceLang === targetLang) return text;
  
  // Простые правила для демонстрации
  if (sourceLang === 'ru' && targetLang === 'en') {
    // Базовые замены для русского -> английский
    // ВАЖНО: сначала заменяем прилагательные и составные конструкции, потом существительные
    return text
      // Составные конструкции (сначала!)
      .replace(/Тестнет Astar Network на Kusama/g, 'Testnet Astar Network on Kusama')
      .replace(/Тестнет Algorand/g, 'Testnet Algorand')
      .replace(/Move-смарт-контрактов/g, 'Move smart contracts')
      .replace(/Move-смарт контрактов/g, 'Move smart contracts')
      .replace(/Move смарт-контрактов/g, 'Move smart contracts')
      .replace(/смарт-контрактов/g, 'smart contracts')
      .replace(/смарт контрактов/g, 'smart contracts')
      .replace(/партнёрских кранов/g, 'partner faucets')
      .replace(/партнерских кранов/g, 'partner faucets')
      .replace(/официальных и партнёрских кранов/g, 'official and partner faucets')
      .replace(/официальных и партнерских кранов/g, 'official and partner faucets')
      .replace(/Несколько официальных/g, 'Several official')
      .replace(/несколько официальных/g, 'several official')
      .replace(/Для тестирования/g, 'For testing')
      .replace(/для тестирования/g, 'for testing')
      .replace(/Для разработки/g, 'For development')
      .replace(/для разработки/g, 'for development')
      
      // Прилагательные (средний род)
      .replace(/Официальный/g, 'Official')
      .replace(/официальный/g, 'official')
      // Прилагательные (женский род)
      .replace(/Официальная/g, 'Official')
      .replace(/официальная/g, 'official')
      // Прилагательные (множественное число)
      .replace(/Официальные/g, 'Official')
      .replace(/официальные/g, 'official')
      .replace(/Официальных/g, 'Official')
      .replace(/официальных/g, 'official')
      // Прилагательные (средний род)
      .replace(/Официальное/g, 'Official')
      .replace(/официальное/g, 'official')
      
      // Существительные и другие слова
      .replace(/Тестнет/g, 'Testnet')
      .replace(/тестнет/g, 'testnet')
      .replace(/Мейннет/g, 'Mainnet')
      .replace(/мейннет/g, 'mainnet')
      .replace(/Портал/g, 'Portal')
      .replace(/портал/g, 'portal')
      .replace(/Сторонний/g, 'Third-party')
      .replace(/сторонний/g, 'third-party')
      .replace(/Сторонняя/g, 'Third-party')
      .replace(/сторонняя/g, 'third-party')
      .replace(/сеть/g, 'network')
      .replace(/Сеть/g, 'Network')
      .replace(/на Kusama/g, 'on Kusama')
      .replace(/на Ethereum/g, 'on Ethereum')
      .replace(/на Aptos/g, 'on Aptos')
      .replace(/на Algorand/g, 'on Algorand')
      .replace(/разработки/g, 'development')
      .replace(/Разработки/g, 'Development')
      .replace(/транзакций/g, 'transactions')
      .replace(/Транзакций/g, 'Transactions')
      .replace(/Ежедневно/g, 'Daily')
      .replace(/ежедневно/g, 'daily')
      .replace(/Каждые/g, 'Every')
      .replace(/каждые/g, 'every')
      .replace(/часов/g, 'hours')
      .replace(/минут/g, 'minutes')
      .replace(/секунд/g, 'seconds')
      .replace(/Бесплатный/g, 'Free')
      .replace(/бесплатный/g, 'free')
      .replace(/Платный/g, 'Paid')
      .replace(/платный/g, 'paid')
      .replace(/Получите/g, 'Get')
      .replace(/получите/g, 'get')
      .replace(/Заберите/g, 'Claim')
      .replace(/заберите/g, 'claim')
      .replace(/Награда/g, 'Reward')
      .replace(/награда/g, 'reward')
      .replace(/Награды/g, 'Rewards')
      .replace(/награды/g, 'rewards')
      .replace(/Кулдаун/g, 'Cooldown')
      .replace(/кулдаун/g, 'cooldown')
      .replace(/Ожидание/g, 'Wait time')
      .replace(/ожидание/g, 'wait time')
      .replace(/Поддержка/g, 'Support')
      .replace(/поддержка/g, 'support')
      .replace(/Сайт/g, 'Website')
      .replace(/сайт/g, 'website')
      .replace(/Ссылка/g, 'Link')
      .replace(/ссылка/g, 'link')
      .replace(/Ссылки/g, 'Links')
      .replace(/ссылки/g, 'links')
      
      // Краны (в самом конце!)
      .replace(/краны/g, 'faucets')
      .replace(/кранов/g, 'faucets')
      .replace(/Краны/g, 'Faucets')
      .replace(/Кран/g, 'Faucet')
      .replace(/кран/g, 'faucet');
  }
  
  if (sourceLang === 'en' && targetLang === 'ru') {
    // Базовые замены для английский -> русский
    // ВАЖНО: сначала составные конструкции
    return text
      // Составные конструкции (сначала!)
      .replace(/Testnet Astar Network on Kusama/g, 'Тестнет Astar Network на Kusama')
      .replace(/Testnet Algorand/g, 'Тестнет Algorand')
      .replace(/Move smart contracts/g, 'Move-смарт-контрактов')
      .replace(/smart contracts/g, 'смарт-контрактов')
      .replace(/partner faucets/g, 'партнёрских кранов')
      .replace(/official and partner faucets/g, 'официальных и партнёрских кранов')
      .replace(/Several official/g, 'Несколько официальных')
      .replace(/several official/g, 'несколько официальных')
      .replace(/For testing/g, 'Для тестирования')
      .replace(/for testing/g, 'для тестирования')
      .replace(/For development/g, 'Для разработки')
      .replace(/for development/g, 'для разработки')
      
      // Прилагательные
      .replace(/Official/g, 'Официальный')
      .replace(/official/g, 'официальный')
      .replace(/Third-party/g, 'Сторонний')
      .replace(/third-party/g, 'сторонний')
      
      // Существительные и другие слова
      .replace(/Testnet/g, 'Тестнет')
      .replace(/testnet/g, 'тестнет')
      .replace(/Mainnet/g, 'Мейннет')
      .replace(/mainnet/g, 'мейннет')
      .replace(/Portal/g, 'Портал')
      .replace(/portal/g, 'портал')
      .replace(/network/g, 'сеть')
      .replace(/Network/g, 'Сеть')
      .replace(/on Kusama/g, 'на Kusama')
      .replace(/on Ethereum/g, 'на Ethereum')
      .replace(/on Aptos/g, 'на Aptos')
      .replace(/on Algorand/g, 'на Algorand')
      .replace(/development/g, 'разработки')
      .replace(/Development/g, 'Разработки')
      .replace(/transactions/g, 'транзакций')
      .replace(/Transactions/g, 'Транзакций')
      .replace(/Daily/g, 'Ежедневно')
      .replace(/daily/g, 'ежедневно')
      .replace(/Every/g, 'Каждые')
      .replace(/every/g, 'каждые')
      .replace(/hours/g, 'часов')
      .replace(/minutes/g, 'минут')
      .replace(/seconds/g, 'секунд')
      .replace(/Free/g, 'Бесплатный')
      .replace(/free/g, 'бесплатный')
      .replace(/Paid/g, 'Платный')
      .replace(/paid/g, 'платный')
      .replace(/Get/g, 'Получите')
      .replace(/get/g, 'получите')
      .replace(/Claim/g, 'Заберите')
      .replace(/claim/g, 'заберите')
      .replace(/Reward/g, 'Награда')
      .replace(/reward/g, 'награда')
      .replace(/Rewards/g, 'Награды')
      .replace(/rewards/g, 'награды')
      .replace(/Cooldown/g, 'Кулдаун')
      .replace(/cooldown/g, 'кулдаун')
      .replace(/Wait time/g, 'Ожидание')
      .replace(/wait time/g, 'ожидание')
      .replace(/Support/g, 'Поддержка')
      .replace(/support/g, 'поддержка')
      .replace(/Website/g, 'Сайт')
      .replace(/website/g, 'сайт')
      .replace(/Link/g, 'Ссылка')
      .replace(/link/g, 'ссылка')
      .replace(/Links/g, 'Ссылки')
      .replace(/links/g, 'ссылки')
      
      // Краны (в самом конце!)
      .replace(/Faucets/g, 'Краны')
      .replace(/faucets/g, 'краны')
      .replace(/Faucet/g, 'Кран')
      .replace(/faucet/g, 'кран');
  }
  
  return text; // Возвращаем оригинал если нет правил
}

// Основной эндпоинт перевода
app.post('/translate', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;
  
  if (!text || !sourceLang || !targetLang) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  
  try {
    const translated = await translateWithLLM(text, sourceLang, targetLang);
    res.json({ translated });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Эндпоинт для проверки статуса
app.get('/status', (req, res) => {
  const hasGroqKey = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'gsk_dummy_key';
  res.json({ 
    status: 'running', 
    port: PORT,
    cacheSize: Object.keys(translationCache).length,
    groqEnabled: hasGroqKey,
    model: hasGroqKey ? 'llama-3.3-70b-versatile' : 'fallback-rules',
    timestamp: new Date().toISOString()
  });
});

// Эндпоинт для очистки кэша
app.delete('/cache', (req, res) => {
  translationCache = {};
  try {
    fs.unlinkSync(CACHE_FILE);
  } catch (e) {
    console.warn('Cache file not found');
  }
  res.json({ message: 'Cache cleared' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🌐 Faucet Translation Service running on port ${PORT}`);
  console.log(`📡 Available endpoints:`);
  console.log(`   POST /translate - Translate text`);
  console.log(`   GET  /status  - Service status`);
  console.log(`   DELETE /cache  - Clear translation cache`);
  console.log(`🔗 Access from: http://localhost:${PORT}`);
  
  // Проверяем API ключ
  const hasGroqKey = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'gsk_dummy_key';
  if (hasGroqKey) {
    console.log(`🤖 Groq LLM ENABLED - Model: llama-3.3-70b-versatile`);
    console.log(`🔑 API Key: ${process.env.GROQ_API_KEY.substring(0, 10)}...`);
  } else {
    console.log(`⚠️  Groq LLM DISABLED - Using fallback rules only`);
    console.log(`💡 Add GROQ_API_KEY to .env file to enable LLM translation`);
  }
});

module.exports = app;
