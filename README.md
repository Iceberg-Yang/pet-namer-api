# Pet Namer API

一个基于 Next.js 和 DeepSeek AI 的宠物命名 API 服务，可部署在 Vercel 上。

## 功能特性

- 🐾 基于宠物类型和性格生成个性化名字
- 🤖 使用 DeepSeek AI 模型进行智能命名
- 🚀 支持 Vercel 一键部署
- 🔒 完整的错误处理和输入验证
- 🌐 支持 CORS，适合前端调用

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd pet-namer-api
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `env.example` 为 `.env.local` 并填入您的 DeepSeek API 密钥：

```bash
cp env.example .env.local
```

编辑 `.env.local`：
```
DEEPSEEK_API_KEY=your_actual_deepseek_api_key
```

### 4. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000 查看 API 文档。

## 部署到 Vercel

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 在 Vercel 中部署

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入您的 GitHub 仓库
4. 在环境变量设置中添加 `DEEPSEEK_API_KEY`
5. 点击 "Deploy"

## API 使用说明

### 端点

```
POST /api/generate
```

### 请求格式

```json
{
  "type": "宠物类型，如猫/狗",
  "personality": "宠物性格，如可爱/高冷"
}
```

### 响应格式

成功响应：
```json
{
  "name": "生成的宠物名字",
  "status": 200
}
```

错误响应：
```json
{
  "error": "错误信息",
  "status": 错误代码
}
```

### 使用示例

#### cURL

```bash
curl -X POST https://your-domain.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "猫",
    "personality": "可爱"
  }'
```

#### JavaScript

```javascript
const response = await fetch('https://your-domain.vercel.app/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: '猫',
    personality: '可爱'
  })
});

const data = await response.json();
console.log(data.name); // 输出生成的宠物名字
```

#### Python

```python
import requests

response = requests.post(
    'https://your-domain.vercel.app/api/generate',
    json={
        'type': '猫',
        'personality': '可爱'
    }
)

data = response.json()
print(data['name'])  # 输出生成的宠物名字
```

## 错误处理

API 包含完整的错误处理机制：

- **400**: 缺少必需字段
- **405**: 使用了错误的 HTTP 方法
- **500**: 服务器内部错误或 API 密钥配置问题

## 环境变量

| 变量名 | 描述 | 必需 |
|--------|------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 | 是 |

## 技术栈

- **框架**: Next.js 14
- **部署**: Vercel
- **AI 服务**: DeepSeek API
- **语言**: JavaScript (Node.js)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 支持

如有问题，请创建 GitHub Issue 或联系开发者。 