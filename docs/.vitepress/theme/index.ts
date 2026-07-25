import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import GiscusComments from './GiscusComments.vue'
import NotFound from './NotFound.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(ShareButtons),
      'doc-after': () => h(GiscusComments)
    })
  },
  enhanceApp({ app }) {
    app.component('NotFound', NotFound)
  }
} as Theme

function ShareButtons() {
  if (typeof window === 'undefined') return null

  const shareUrls = [
    {
      name: '微信',
      icon: '&#x1F4AC;',
      action: 'wechat'
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
    } else if (item.action === 'wechat') {
      showWechatModal()
    } else if (item.url) {
      window.open(item.url, '_blank')
    }
  }

  const showWechatModal = () => {
    const url = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(window.location.href)
    const modal = document.createElement('div')
    modal.className = 'qr-modal'
    modal.innerHTML = `
      <div class="qr-content">
        <button class="qr-close">×</button>
        <h3 class="qr-title">微信扫码分享</h3>
        <img class="qr-image" src="${url}" alt="二维码">
        <p class="qr-desc">打开微信扫一扫，扫描二维码分享文章</p>
      </div>
    `
    const closeBtn = modal.querySelector('.qr-close') as HTMLElement
    closeBtn.addEventListener('click', () => modal.remove())
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove()
    })
    document.body.appendChild(modal)
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
    )
  ])
}