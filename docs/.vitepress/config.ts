import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的博客',
  description: '我的个人博客',
  base: '/',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.jpg' }]
  ],
  themeConfig: {
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
    ]
  }
})
