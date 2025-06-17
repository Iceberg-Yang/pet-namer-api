# Pet Namer API

一个基于 DeepSeek AI 的宠物命名 API 服务，使用 Next.js 构建并部署在 Vercel 上。

## 功能特性

- 🐾 为不同性格的宠物生成个性化名字
- 🤖 基于 DeepSeek AI 的智能命名
- 🚀 快速响应，支持 CORS
- 📱 简单易用的 REST API

## 本地开发

### 环境要求

- Node.js 18.0.0 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 配置环境变量

1. 复制环境变量模板：
```bash
cp env.example .env.local
```

2. 编辑 `.env.local` 文件，添加你的 DeepSeek API 密钥：
```
DEEPSEEK_API_KEY=your_actual_api_key_here
```

### 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 测试 API

```bash
node test-api.js
```

## Vercel 部署

### 1. 环境变量配置

在 Vercel 项目设置中，必须配置以下环境变量：

1. 进入 Vercel 控制台
2. 选择你的项目
3. 点击 "Settings" → "Environment Variables"
4. 添加变量：
   - **Name**: `DEEPSEEK_API_KEY`
   - **Value**: 你的 DeepSeek API 密钥
   - **Environment**: Production, Preview, Development (全选)

### 2. 常见部署问题排查

#### 问题 1: API 返回 500 错误
**原因**: 环境变量未配置或配置错误
**解决方案**: 
- 检查 Vercel 环境变量是否正确设置
- 确保 API 密钥有效
- 查看 Vercel 函数日志

#### 问题 2: API 无法访问
**原因**: 路由配置问题
**解决方案**:
- 确保 `pages/api/generate.js` 文件存在
- 检查 `vercel.json` 配置

#### 问题 3: CORS 错误
**原因**: 跨域请求被阻止
**解决方案**:
- 代码中已包含 CORS 配置
- 检查 `next.config.js` 中的 headers 配置

### 3. 验证部署

部署完成后，可以通过以下方式验证：

1. 访问你的 Vercel 域名
2. 使用测试脚本（修改 URL）：
```bash
# 修改 test-api.js 中的 API_URL
const API_URL = 'https://your-domain.vercel.app/api/generate';
node test-api.js
```

3. 使用 curl 测试：
```bash
curl -X POST https://your-domain.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{"type": "猫", "personality": "可爱"}'
```

## API 文档

### 端点

`POST /api/generate`

### 请求格式

```json
{
  "type": "宠物类型，如猫/狗",
  "personality": "宠物性格，如可爱/高冷"
}
```

### 响应格式

```json
{
  "name": "起的名字",
  "status": 200
}
```

### 示例

**请求**:
```bash
curl -X POST https://your-domain.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{"type": "猫", "personality": "可爱"}'
```

**响应**:
```json
{
  "name": "小咪 - 可爱的小猫咪",
  "status": 200
}
```

## 故障排除

### 本地运行正常，Vercel 无法访问

1. **检查环境变量**：
   - 登录 Vercel 控制台
   - 进入项目设置 → Environment Variables
   - 确保 `DEEPSEEK_API_KEY` 已正确设置

2. **检查部署日志**：
   - 在 Vercel 控制台查看函数日志
   - 寻找错误信息

3. **测试 API 端点**：
   - 直接访问 `https://your-domain.vercel.app/api/generate`
   - 应该返回 405 错误（因为不是 POST 请求）

4. **检查网络请求**：
   - 使用浏览器开发者工具
   - 查看网络请求的详细信息

### 常见错误代码

- **500**: 服务器内部错误，通常是环境变量问题
- **405**: 方法不允许，正常（因为访问的是 GET 请求）
- **400**: 请求参数错误
- **401**: API 密钥无效

## 技术栈

- **框架**: Next.js 14
- **部署**: Vercel
- **AI 服务**: DeepSeek API
- **语言**: JavaScript

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 支持

如有问题，请创建 GitHub Issue 或联系开发者。 