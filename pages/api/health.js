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
    const nodeEnv = process.env.NODE_ENV || 'development';
    const hasApiKey = !!apiKey;
    const apiKeyLength = hasApiKey ? apiKey.length : 0;
    const apiKeyPrefix = hasApiKey ? apiKey.substring(0, 8) + '...' : 'none';

    // 检查API密钥格式
    const isValidApiKey = hasApiKey && apiKeyLength >= 10;

    return res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: nodeEnv,
        hasApiKey: hasApiKey,
        apiKeyLength: apiKeyLength,
        apiKeyPrefix: apiKeyPrefix,
        isValidApiKey: isValidApiKey,
        isProduction: nodeEnv === 'production'
      },
      version: '1.0.0',
      message: hasApiKey 
        ? (isValidApiKey ? 'API密钥配置正确' : 'API密钥格式可能不正确')
        : '请在Vercel项目设置中配置DEEPSEEK_API_KEY环境变量'
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