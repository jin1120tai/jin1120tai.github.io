import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(ShareButtons)
    })
  }
} as Theme

function ShareButtons() {
  if (typeof window === 'undefined') return null
  
  const shareUrls = [
    {
      name: '微信',
      icon: '&#x1F4AC;',
      url: 'https://share.noteyou.cn/api/wechat?url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent(document.title)
    },
    {
      name: '微博',
      icon: '&#x1F600;',
      url: 'https://service.weibo.com/share/share.php?url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent(document.title)
    },
    {
      name: '复制链接',
      icon: '&#x1F4CB;',
      action: 'copy'
    },
    {
      name: '浏览器分享',
      icon: '&#x1F517;',
      action: 'share'
    }
  ]

  const handleShare = (item: typeof shareUrls[0]) => {
    if (item.action === 'copy') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板')
      })
    } else if (item.action === 'share' && navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      })
    } else {
      window.open(item.url, '_blank')
    }
  }

  return h('div', { class: 'share-buttons' }, [
    h('span', { class: 'share-label' }, '分享文章'),
    h('div', { class: 'share-icons' },
      shareUrls.map(item =>
        h('button', {
          class: 'share-btn',
          title: item.name,
          onClick: () => handleShare(item)
        }, [
          h('span', { class: 'share-icon', innerHTML: item.icon }),
          h('span', { class: 'share-text' }, item.name)
        ])
      )
    ),
    h('style', { scoped: true }, `
      .share-buttons {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border-top: 1px solid #eee;
        margin-top: 24px;
      }
      .share-label {
        font-size: 14px;
        color: #666;
        font-weight: 500;
      }
      .share-icons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .share-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: #fff;
        cursor: pointer;
        font-size: 13px;
        color: #333;
        transition: all 0.2s;
      }
      .share-btn:hover {
        background: #f5f5f5;
        border-color: #bbb;
      }
      .share-icon {
        font-size: 16px;
      }
      .share-text {
        font-size: 13px;
      }
    `)
  ])
}
