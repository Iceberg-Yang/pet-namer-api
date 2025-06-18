export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed. Please use POST method.',
      status: 405
    });
  }

  try {
    // 验证请求体
    const { type, personality } = req.body;

    if (!type || !personality) {
      console.log('Missing required fields:', { type, personality });
      return res.status(400).json({
        error: 'Missing required fields: type and personality are required',
        status: 400
      });
    }

    // 验证环境变量 - 明确检查Vercel环境变量
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const nodeEnv = process.env.NODE_ENV || 'development';
    
    console.log('Environment check:', {
      nodeEnv: nodeEnv,
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'none'
    });

    if (!apiKey) {
      console.error('DEEPSEEK_API_KEY environment variable is not configured');
      return res.status(500).json({
        error: 'DEEPSEEK_API_KEY environment variable is not configured',
        details: {
          environment: nodeEnv,
          message: '请在Vercel项目设置中配置DEEPSEEK_API_KEY环境变量'
        },
        status: 500
      });
    }

    // 验证API密钥格式
    if (apiKey.length < 10) {
      console.error('API key seems too short:', apiKey.length);
      return res.status(500).json({
        error: 'Invalid API key format',
        details: {
          message: 'API密钥格式不正确，请检查Vercel环境变量配置'
        },
        status: 500
      });
    }

    console.log('API Key validation passed');
    console.log('Request parameters:', { type, personality });

    // 构建 prompt
    const prompt = `请为一只${personality}的${type}宠物起一个名字，只输出名字和十个字以内的解释`;

    console.log('Calling DeepSeek API with prompt:', prompt);

    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    console.log('DeepSeek API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      
      return res.status(response.status).json({
        error: `DeepSeek API request failed: ${response.statusText}`,
        details: errorData,
        status: response.status
      });
    }

    const data = await response.json();
    console.log('DeepSeek API response data:', JSON.stringify(data, null, 2));
    
    // 提取生成的名称
    const generatedName = data.choices?.[0]?.message?.content?.trim();
    
    if (!generatedName) {
      console.error('No generated name found in response:', data);
      return res.status(500).json({
        error: 'Failed to generate pet name from AI response',
        status: 500
      });
    }

    console.log('Generated name:', generatedName);

    // 返回成功响应
    return res.status(200).json({
      name: generatedName,
      status: 200
    });

  } catch (error) {
    console.error('API Error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      status: 500
    });
  }
} 