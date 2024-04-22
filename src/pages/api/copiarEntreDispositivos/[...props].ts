
const requestCounts = new Map();
const MAX_REQUESTS_PER_MINUTE = 20; // Qtd de requests por minuto
const RATE_LIMIT_INTERVAL = 60000; // 1 minuto

function rateLimitAndOriginMiddleware(req, res, next) {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const allowedOrigin = 'https://comeinhandy.com.br'; 

  // if (req.headers.origin !== allowedOrigin) {
  //   return res.status(403).json({ error: 'Forbidden' });
  // }

  if (requestCounts.has(clientIP)) {
    const count = requestCounts.get(clientIP);
    if (count >= MAX_REQUESTS_PER_MINUTE) {
      return res.status(429).json({ error: 'Too Many Requests' });
    }
    requestCounts.set(clientIP, count + 1);
  } else {
    requestCounts.set(clientIP, 1);
  }

  // Reseta o contator de requests após o intervalo especificado
  setTimeout(() => {
    requestCounts.delete(clientIP);
  }, RATE_LIMIT_INTERVAL);

  next();
}

export default async function handler(req, res) {

}