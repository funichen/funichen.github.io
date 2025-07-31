# GitHub Pages + Gemini API 完整设置指南

## 🔧 步骤 1: 配置 GitHub Pages

### 1.1 进入仓库设置
1. 打开你的仓库: `https://github.com/funichen/funichen.github.io`
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**

### 1.2 配置部署源
1. 在 **Source** 部分，选择 **GitHub Actions**
2. 这样就会使用我们的 `.github/workflows/deploy.yml` 文件进行自动部署

## 🔑 步骤 2: 配置 API Secret

### 2.1 获取 Gemini API Key
1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登录你的 Google 账户
3. 点击 **Create API Key**
4. 复制生成的 API key

### 2.2 添加 Repository Secret
1. 在你的仓库中，点击 **Settings** 标签页
2. 在左侧菜单中找到 **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. **Name**: `GEMINI_API_KEY`
5. **Value**: 粘贴你刚才复制的 API key
6. 点击 **Add secret**

## 🔄 步骤 3: 验证配置

### 3.1 检查 GitHub Actions
1. 在你的仓库中，点击 **Actions** 标签页
2. 你应该能看到 "Build and Deploy with Environment Variables" 工作流
3. 点击最新的运行记录
4. 检查 "Create environment config" 步骤的日志
5. 应该看到:
   ```
   ✅ env-config.js created successfully
   🔑 GEMINI_API_KEY secret is available
   ```

### 3.2 检查部署
1. 等待部署完成（通常 2-5 分钟）
2. 访问你的网站: `https://funichen.github.io`
3. 打开浏览器开发者工具（F12）
4. 查看控制台，应该看到环境配置的调试信息

## 🧪 步骤 4: 测试 API

### 4.1 测试 Google Guide 配置
1. 访问: `https://funichen.github.io/google-test.html`
2. 页面应该自动运行 API 测试
3. 如果成功，你会看到 "✅ Google Guide API call successful!"

### 4.2 测试聊天机器人
1. 访问: `https://funichen.github.io`
2. 点击 "Start Chat" 或右下角的聊天按钮
3. 发送一条消息测试

## 🔍 故障排除

### 问题 1: "GEMINI_API_KEY secret is NOT available"
**解决方案**:
- 检查 Repository Secrets 是否正确设置
- 确保 secret 名称是 `GEMINI_API_KEY`（区分大小写）
- 重新添加 secret

### 问题 2: GitHub Pages 没有更新
**解决方案**:
- 确保选择了 **GitHub Actions** 作为部署源
- 检查 Actions 标签页中的工作流是否成功运行
- 等待部署完成（可能需要几分钟）

### 问题 3: API 请求失败
**解决方案**:
- 检查 API key 是否有效
- 确保 API key 有足够的配额
- 检查网络连接

### 问题 4: 环境变量没有加载
**解决方案**:
- 检查 `js/env-config.js` 文件是否正确生成
- 查看浏览器控制台的调试信息
- 确保所有 JavaScript 文件按正确顺序加载

## 📁 文件结构说明

```
funichen.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── js/
│   ├── env-config.js          # 由 GitHub Actions 生成（包含 API key）
│   ├── api-config.js          # 读取环境变量
│   ├── config.js              # 主配置文件
│   ├── ai-service.js          # AI 服务
│   └── ...                    # 其他 JavaScript 文件
├── index.html                 # 主页面
└── google-test.html           # API 测试页面
```

## 🔒 安全说明

- API key 存储在 GitHub Secrets 中，不会暴露在代码中
- `env-config.js` 文件在部署时动态生成
- 只有你控制的个人网站，API key 在客户端是安全的

## 📞 获取帮助

如果遇到问题：
1. 检查 GitHub Actions 日志
2. 查看浏览器控制台错误信息
3. 确认所有步骤都正确完成

---

**完成这些步骤后，你的 AI 聊天机器人应该可以正常工作了！** 🎉 