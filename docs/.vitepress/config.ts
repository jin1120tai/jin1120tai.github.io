import { defineConfig } from 'vitepress'
import { logoBase64 } from './logo-base64'

export default defineConfig({
  title: '金汐的博客',
  description: '我的个人博客',
  base: '/',
  ignoreDeadLinks: false,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }]
  ],
  themeConfig: {
    siteTitle: '金汐的博客',
    logo: logoBase64,
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/myFirstBlog' }
    ],
    sidebar: [
      {
        text: '文章',
        items: [
          { text: '我的第一篇博客', link: '/posts/myFirstBlog' },
          { text: '人工智能辅修过半总结', link: '/posts/ai-minor-semester-summary' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '目录'
    },
    search: {
      provider: 'local'
    }
  },
  comment: {
    provider: 'giscus',
    options: {
      repo: 'jin1120tai/jin1120tai.github.io',
      repoId: 'R_kgDOKn4a8Q',
      category: 'Comments',
      categoryId: 'DIC_kwDOKn4a8c4C0f6k',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      theme: 'light',
      lang: 'zh-CN',
      loading: 'lazy'
    }
  }
})
