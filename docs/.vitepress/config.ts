import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  lang: 'zh-CN',
  title: '我的 VitePress 博客',
  description: '一个基于 VitePress 的技术博客',

  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/guide/getting-started' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '入门指南', link: '/guide/getting-started' }
        ]
      }
    ]
  }
})
