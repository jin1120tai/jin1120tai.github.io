---
title: 使用 VitePress 搭建个人博客
date: 2026-07-03
---

# 使用 VitePress 搭建个人博客

本文记录了使用 VitePress + GitHub Pages 搭建个人博客的完整过程。

## 什么是 VitePress？

VitePress 是由 Vue.js 团队开发的一款静态站点生成器（SSG），主要用于编写技术文档，但同样非常适合搭建个人博客。它具有以下特点：

- **基于 Vue 3 和 Vite**：构建速度快，开发体验好
- **Markdown 增强**：支持在 Markdown 中直接使用 Vue 组件
- **默认主题美观**：开箱即用的优雅界面
- **SEO 友好**：自动生成 sitemap，支持 meta 标签配置

## 搭建步骤

### 第一步：初始化项目

首先创建项目目录并初始化 `package.json`：

```bash
mkdir my-blog && cd my-blog
npm init -y
```

### 第二步：安装 VitePress

将 VitePress 作为开发依赖安装：

```bash
npm install -D vitepress vue
```

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "serve": "vitepress serve docs"
  }
}
```

### 第三步：创建目录结构

```
my-blog/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts    # 配置文件
│   ├── index.md         # 首页
│   ├── posts/           # 博客文章
│   │   └── first-post.md
│   ├── guide/           # 指南页面
│   └── about.md         # 关于页面
├── .github/
│   └── workflows/
│       └── pages.yml    # GitHub Actions 配置
├── package.json
└── .gitignore
```

### 第四步：配置 VitePress

在 `docs/.vitepress/config.ts` 中进行基本配置：

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '我的博客',
  description: '个人技术博客',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' }
    ],
    sidebar: [
      {
        text: '文章',
        items: [
          { text: '使用 VitePress 搭建个人博客', link: '/posts/build-blog-with-vitepress' }
        ]
      }
    ]
  }
})
```

### 第五步：配置 GitHub Actions 自动部署

创建 `.github/workflows/pages.yml`，实现推送代码后自动构建并部署到 GitHub Pages：

```yaml
name: Deploy VitePress to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

### 第六步：配置 GitHub Pages

1. 进入仓库的 **Settings → Pages**
2. 将 **Source** 设置为 **GitHub Actions**

## 遇到的问题与解决方案

### 问题一：GitHub Actions 部署失败

**原因**：缺少 `permissions` 声明，导致 GitHub Pages 相关的写入权限不足。

**解决**：在 workflow 文件中添加 `permissions: pages: write` 和 `id-token: write`，并使用 `upload-pages-artifact` + `deploy-pages` 的标准部署流程。

### 问题二：VitePress 版本兼容性问题

**原因**：使用了 alpha 测试版本（`1.0.0-alpha.28`），API 可能不稳定。

**解决**：升级到最新的稳定版本（`^1.6.3`），确保构建稳定性。

### 问题三：GitHub Pages 不显示更新内容

**原因**：GitHub Pages 默认使用 Jekyll 处理，以下划线或点开头的目录会被忽略。

**解决**：在构建输出目录中添加 `.nojekyll` 空文件，禁用 Jekyll 处理。可以通过 VitePress 的 `buildEnd` 钩子自动完成：

```ts
buildEnd(siteConfig) {
  writeFileSync(`${siteConfig.outDir}/.nojekyll`, '')
}
```

## 总结

通过 VitePress + GitHub Actions + GitHub Pages 的组合，可以零成本搭建一个自动部署的个人博客。整个过程核心步骤不多，但细节配置（如权限、`.nojekyll` 文件）容易遗漏，需要仔细排查。

> 本博客即是通过上述流程搭建并部署的。
