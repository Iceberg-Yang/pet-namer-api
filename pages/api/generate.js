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
      return res.status(400).json({
        error: 'Missing required fields: type and personality are required',
        status: 400
      });
    }

    // 验证环境变量
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'DEEPSEEK_API_KEY environment variable is not configured',
        status: 500
      });
    }

    // 构建 prompt
    const prompt = `请为一只${personality}的${type}宠物起一个名字，只输出名字和十个字以内的解释`;

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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      return res.status(response.status).json({
        error: `DeepSeek API request failed: ${response.statusText}`,
        status: response.status
      });
    }

    const data = await response.json();
    
    // 提取生成的名称
    const generatedName = data.choices?.[0]?.message?.content?.trim();
    
    if (!generatedName) {
      return res.status(500).json({
        error: 'Failed to generate pet name from AI response',
        status: 500
      });
    }

    // 返回成功响应
    return res.status(200).json({
      name: generatedName,
      status: 200
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      status: 500
    });
  }
} 