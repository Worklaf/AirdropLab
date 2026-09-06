// api/coingecko.js - CommonJS вариант 

module.exports = async function handler(req, res) {
  // Разрешаем CORS для всех доменов
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Обработка preflight запроса
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path } = req.query;
    
    if (!path) {
      return res.status(400).json({ error: 'Path parameter is required' });
    }

    // Формируем URL для CoinGecko API
    const coinGeckoUrl = `https://api.coingecko.com/api/v3/${path}`;
    
    console.log('Proxying request to:', coinGeckoUrl);

    // Делаем запрос к CoinGecko
    const response = await fetch(coinGeckoUrl, {
      headers: {
        'User-Agent': 'AirdropLab/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // Если 429, ждем и пробуем еще раз
      if (response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const retryResponse = await fetch(coinGeckoUrl, {
          headers: {
            'User-Agent': 'AirdropLab/1.0',
            'Accept': 'application/json'
          }
        });
        
        if (!retryResponse.ok) {
          return res.status(429).json({ 
            error: 'Rate limit exceeded', 
            message: 'CoinGecko API rate limit exceeded. Please try again later.' 
          });
        }
        
        const data = await retryResponse.json();
        return res.status(200).json(data);
      }
      
      return res.status(response.status).json({ 
        error: 'CoinGecko API error',
        status: response.status 
      });
    }

    const data = await response.json();
    
    // Добавляем кэш заголовки
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};
