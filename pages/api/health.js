export default function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许 GET 请求
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed. Please use GET method.',
      status: 405
    });
  }

  try {
    // 检查环境变量
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const hasApiKey = !!apiKey;

    return res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: {
        hasApiKey: hasApiKey,
        apiKeyLength: hasApiKey ? apiKey.length : 0,
        nodeEnv: process.env.NODE_ENV || 'development'
      },
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 