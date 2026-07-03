import { defineConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  lang: 'zh-CN',
  title: '我的 VitePress 博客',
  description: '一个基于 VitePress 的技术博客',

  ignoreDeadLinks: true,

  // 构建完成后自动添加 .nojekyll 文件
  buildEnd(siteConfig) {
    const outDir = siteConfig.outDir
    writeFileSync(`${outDir}/.nojekyll`, '')
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '关于', link: '/about' }
    ],
    sidebar: [
      {
        text: '文章',
        items: [
          { text: '使用 VitePress 搭建个人博客', link: '/posts/build-blog-with-vitepress' }
        ]
      },
      {
        text: '指南',
        items: [
          { text: '入门指南', link: '/guide/getting-started' }
        ]
      }
    ],
    footer: {
      message: '基于 VitePress 构建'
    }
  }
})
