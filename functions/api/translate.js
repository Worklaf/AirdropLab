// CloudFlare Pages Function для перевода
// Создайте файл: functions/api/translate.js

export async function onRequestPost(context) {
  const { text, sourceLang, targetLang } = await context.request.json();
  
  if (!text || !sourceLang || !targetLang) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Используем Groq API напрямую
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        max_tokens: 1000,
        messages: [{
          role: 'system',
          content: `You are an expert translator specializing in cryptocurrency and blockchain content.
Translate from ${sourceLang.toUpperCase()} to ${targetLang.toUpperCase()} with NATIVE-LEVEL FLUENCY.

CRITICAL RULES:
1. Keep exact: Token symbols ($ETH, $SOL), tech acronyms (NFT, DeFi, DAO)
2. Translate crypto terms correctly: "кран" → "faucet", "нода" → "node", "тестнет" → "testnet"
3. Return ONLY the translation - no explanations

CRYPTO GLOSSARY:
- кран/краны → faucet/faucets
- тестнет → testnet
- мейннет → mainnet
- нода → node
- стейкинг → staking
- смарт-контракт → smart contract`
        }, {
          role: 'user',
          content: text
        }]
      })
    });

    const data = await response.json();
    const translated = data.choices[0].message.content.trim();

    return new Response(JSON.stringify({ translated }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Fallback перевод
    let fallbackTranslation = text;
    
    if (sourceLang === 'ru' && targetLang === 'en') {
      fallbackTranslation = text
        .replace(/кран/g, 'faucet')
        .replace(/Кран/g, 'Faucet')
        .replace(/тестнет/g, 'testnet')
        .replace(/официальный/g, 'official');
    } else if (sourceLang === 'en' && targetLang === 'ru') {
      fallbackTranslation = text
        .replace(/faucet/g, 'кран')
        .replace(/Faucet/g, 'Кран')
        .replace(/testnet/g, 'тестнет')
        .replace(/official/g, 'официальный');
    }

    return new Response(JSON.stringify({ translated: fallbackTranslation }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
