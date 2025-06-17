// 简单的 API 测试脚本
// 使用方法: node test-api.js

const API_URL = 'http://localhost:3000/api/generate'; // 本地测试
// const API_URL = 'https://your-domain.vercel.app/api/generate'; // 生产环境

async function testAPI() {
  const testCases = [
    {
      type: '猫',
      personality: '可爱'
    },
    {
      type: '狗',
      personality: '高冷'
    },
    {
      type: '兔子',
      personality: '活泼'
    }
  ];

  console.log('🧪 开始测试 Pet Namer API...\n');

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`测试 ${i + 1}: ${testCase.personality}的${testCase.type}`);
    
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
        console.log(`✅ 成功: ${data.name}`);
      } else {
        console.log(`❌ 错误: ${data.error}`);
      }
    } catch (error) {
      console.log(`❌ 请求失败: ${error.message}`);
    }
    
    console.log('---');
  }
}

// 运行测试
testAPI().catch(console.error); 