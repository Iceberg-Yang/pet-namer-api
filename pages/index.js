export default function Home() {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <h1>🐾 Pet Namer API</h1>
      <p>一个基于 DeepSeek AI 的宠物命名 API 服务</p>
      
      <h2>使用方法</h2>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>API 端点</h3>
        <code>POST /api/generate</code>
        
        <h3>请求格式</h3>
        <pre style={{ 
          backgroundColor: '#fff', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`{
  "type": "宠物类型，如猫/狗",
  "personality": "宠物性格，如可爱/高冷"
}`}
        </pre>
        
        <h3>响应格式</h3>
        <pre style={{ 
          backgroundColor: '#fff', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`{
  "name": "起的名字",
  "status": 200
}`}
        </pre>
      </div>
      
      <h2>示例</h2>
      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>请求示例</h3>
        <pre style={{ 
          backgroundColor: '#fff', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`curl -X POST https://your-domain.vercel.app/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "猫",
    "personality": "可爱"
  }'`}
        </pre>
        
        <h3>响应示例</h3>
        <pre style={{ 
          backgroundColor: '#fff', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`{
  "name": "小咪",
  "status": 200
}`}
        </pre>
      </div>
      
      <h2>环境变量</h2>
      <p>请在 Vercel 项目设置中配置以下环境变量：</p>
      <ul>
        <li><code>DEEPSEEK_API_KEY</code> - 您的 DeepSeek API 密钥</li>
      </ul>
      
      <footer style={{ 
        marginTop: '40px', 
        paddingTop: '20px', 
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>Powered by Next.js + Vercel + DeepSeek AI</p>
      </footer>
    </div>
  );
} 