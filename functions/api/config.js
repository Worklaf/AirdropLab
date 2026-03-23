// API endpoint для безопасной передачи Environment Variables
export async function onRequest(context) {
  const { request, env } = context;
  
  // Проверка CORS и реферер
  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');
  const allowedOrigins = [
    'https://airdroplab.org',
    'https://airdroplab.pages.dev',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : 'https://airdroplab.org',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Дополнительная проверка реферера для безопасности
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response('Unauthorized', { status: 403 });
  }

  // Возвращаем Environment Variables (включая API ключ!)
  const config = {
    CF_AUTH_DOMAIN: env.CF_AUTH_DOMAIN || "testnet-hub.firebaseapp.com",
    CF_PROJECT_ID: env.CF_PROJECT_ID || "testnet-hub",
    CF_STORAGE_BUCKET: env.CF_STORAGE_BUCKET || "testnet-hub.firebasestorage.app",
    CF_MESSAGING_SENDER_ID: env.CF_MESSAGING_SENDER_ID || "497813176653",
    CF_APP_ID: env.CF_APP_ID || "1:497813176653:web:089188fdd1555d76cd7704",
    // Передаем настоящий API ключ!
    CF_API_KEY: env.CF_API_KEY || null,
    ADMIN_UID: env.ADMIN_UID || "SAkz4mdW9reDaIsvqigCNZhEKJR2",
    // Отладка
    debug: {
      envKeys: Object.keys(env || {}),
      hasCF_API_KEY: !!env.CF_API_KEY,
      hasADMIN_UID: !!env.ADMIN_UID,
      apiKeyLength: env.CF_API_KEY ? env.CF_API_KEY.length : 0,
      origin: origin,
      timestamp: new Date().toISOString()
    }
  };

  return new Response(JSON.stringify(config), {
    headers: corsHeaders
  });
}
