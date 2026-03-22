# GitHub Pages 部署说明

## 部署流程

```
master 分支（源代码）
    ↓
GitHub Actions 构建
    ↓
生成静态文件 (examples/dist)
    ↓
部署到 GitHub Pages（独立存储）
```

**重要**：GitHub Pages 部署不会影响 master 分支源代码，源代码完全安全。

## SPA 路由支持

项目通过 `spaFallbackPlugin` 生成 `404.html` 来支持 SPA 路由：

```typescript
// 构建完成后，将 index.html 复制为 404.html
const spaFallbackPlugin = () => ({
  name: 'spa-fallback',
  closeBundle() {
    copyFileSync('dist/index.html', 'dist/404.html')
  },
})
```

### 工作原理

当用户访问 `/js-cool/string` 时：

1. GitHub Pages 找不到 `/js-cool/string` 这个文件
2. 返回 404，但会展示 `404.html`
3. `404.html` 其实就是 `index.html`（包含 Vue 应用）
4. Vue Router 加载后解析 `/string` 路由

## 配置要求

### GitHub 仓库设置

1. 打开 **Settings** → **Pages**
2. **Build and deployment** → **Source** 选择 **GitHub Actions**
3. 如遇分支限制错误，进入 **Settings** → **Environments** → **github-pages**
4. 在 **Deployment branches** 中添加 `master` 分支

### 环境保护规则

如果遇到错误：

```
Branch "master" is not allowed to deploy to github-pages due to environment protection rules.
```

解决方法：

1. 打开 **Settings** → **Environments** → **github-pages**
2. 修改或删除 "Deployment branches" 保护规则
3. 添加 `master` 分支到允许列表

## 部署文件

Workflow 文件：`.github/workflows/deploy.yml`

构建步骤：
1. 构建主库 `js-cool`（examples 通过 `link:..` 依赖它）
2. 进入 examples 目录安装依赖并构建
3. 上传 `examples/dist` 到 GitHub Pages

## 访问地址

部署成功后访问：`https://saqqdy.github.io/js-cool/`

## 其他平台配置

如需部署到其他平台：

| 平台 | 配置 |
|------|------|
| Netlify | 添加 `_redirects` 文件，内容：`/* /index.html 200` |
| Vercel | 添加 `vercel.json` 配置 rewrites |
| Nginx | 配置：`try_files $uri $uri/ /index.html;` |
| Apache | 使用 `.htaccess` 配置 `FallbackResource` |
