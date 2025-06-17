// Vercel 部署测试脚本
// 使用方法: node test-vercel.js <your-vercel-domain>

const API_URL = process.argv[2] || 'https://your-domain.vercel.app/api/generate';

async function testVercelDeployment() {
  console.log('🚀 开始测试 Vercel 部署...\n');
  console.log('测试域名:', API_URL);
  console.log('---\n');

  // 测试 1: 检查 API 端点是否可访问
  console.log('1️⃣ 测试 API 端点可访问性...');
  try {
    const response = await fetch(API_URL, {
      method: 'GET'
    });
    
    if (response.status === 405) {
      console.log('✅ API 端点可访问 (返回 405 是正常的，因为我们发送了 GET 请求)');
    } else {
      console.log(`⚠️  API 端点返回状态码: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ API 端点无法访问:', error.message);
    return;
  }

  // 测试 2: 测试 POST 请求（缺少参数）
  console.log('\n2️⃣ 测试 POST 请求（缺少参数）...');
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    const data = await response.json();
    
    if (response.status === 400) {
      console.log('✅ 参数验证正常工作');
      console.log('   错误信息:', data.error);
    } else {
      console.log(`⚠️  意外状态码: ${response.status}`);
      console.log('   响应:', data);
    }
  } catch (error) {
    console.log('❌ POST 请求失败:', error.message);
  }

  // 测试 3: 测试完整请求
  console.log('\n3️⃣ 测试完整请求...');
  const testCases = [
    {
      type: '猫',
      personality: '可爱'
    },
    {
      type: '狗',
      personality: '高冷'
    }
  ];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`   测试 ${i + 1}: ${testCase.personality}的${testCase.type}`);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(`   ✅ 成功: ${data.name}`);
      } else {
        console.log(`   ❌ 错误 (${response.status}): ${data.error}`);
        if (data.details) {
          console.log(`       详细信息: ${data.details}`);
        }
      }
    } catch (error) {
      console.log(`   ❌ 请求失败: ${error.message}`);
    }
  }

  // 测试 4: 检查环境变量
  console.log('\n4️⃣ 检查环境变量配置...');
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'test',
        personality: 'test'
      })
    });

    const data = await response.json();
    
    if (response.status === 500 && data.error && data.error.includes('DEEPSEEK_API_KEY')) {
      console.log('❌ 环境变量未配置: DEEPSEEK_API_KEY');
      console.log('   请在 Vercel 项目设置中配置环境变量');
    } else if (response.status === 500) {
      console.log('⚠️  服务器错误，可能是 API 密钥问题');
      console.log('   错误信息:', data.error);
    } else if (response.ok) {
      console.log('✅ 环境变量配置正常');
    } else {
      console.log(`⚠️  状态码: ${response.status}`);
      console.log('   响应:', data);
    }
  } catch (error) {
    console.log('❌ 环境变量检查失败:', error.message);
  }

  console.log('\n---');
  console.log('📋 测试完成！');
  console.log('\n💡 故障排除建议:');
  console.log('1. 如果看到 "环境变量未配置" 错误，请在 Vercel 控制台配置 DEEPSEEK_API_KEY');
  console.log('2. 如果看到 "API 端点无法访问" 错误，请检查域名是否正确');
  console.log('3. 如果看到 "服务器错误"，请查看 Vercel 函数日志');
  console.log('4. 确保 DeepSeek API 密钥有效且有足够的配额');
}

// 检查命令行参数
if (!process.argv[2]) {
  console.log('⚠️  请提供你的 Vercel 域名作为参数');
  console.log('使用方法: node test-vercel.js https://your-domain.vercel.app');
  console.log('或者编辑脚本中的 API_URL 变量\n');
}

// 运行测试
testVercelDeployment().catch(console.error); 