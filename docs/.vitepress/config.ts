import { defineConfig } from 'vitepress'
import { logoBase64 } from './logo-base64'

export default defineConfig({
  title: '金汐的博客',
  description: '记录学习，分享成长',
  base: '/',
  ignoreDeadLinks: false,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'author', content: '金汐' }],
    ['meta', { property: 'og:site_name', content: '金汐的博客' }],
    ['meta', { property: 'og:title', content: '金汐的博客' }],
    ['meta', { property: 'og:description', content: '记录学习，分享成长' }],
    ['meta', { property: 'og:image', content: 'https://jin1120tai.github.io/b2.jpg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://jin1120tai.github.io/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '金汐的博客' }],
    ['meta', { name: 'twitter:description', content: '记录学习，分享成长' }],
    ['meta', { name: 'twitter:image', content: 'https://jin1120tai.github.io/b2.jpg' }]
  ],
  themeConfig: {
    siteTitle: '金汐的博客',
    logo: logoBase64,
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],
    sidebar: [
      {
        text: '文章',
        items: [
          { text: '辅修结束，暑假正式开始', link: '/posts/summer-vacation-begins' },
          { text: '人工智能辅修过半总结', link: '/posts/ai-minor-semester-summary' },
          { text: '我的第一篇博客', link: '/posts/myFirstBlog' }
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
  }
})
