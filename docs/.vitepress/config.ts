import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的博客',
  description: '我的个人博客',
  base: '/',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzNiODJmNiIvPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzI0NjU3Ii8+PHRleHQgeD0iNTAiIHk9IjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9InJlZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SlQ8L3RleHQ+PC9zdmc+' }]
  ],
  themeConfig: {
    logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzNiODJmNiIvPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzI0NjU3Ii8+PHRleHQgeD0iNTAiIHk9IjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9InJlZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SlQ8L3RleHQ+PC9zdmc+',
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
