import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'
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
  const isVisible = ref(false)
  const qrCodeUrl = ref('')
  const mounted = ref(false)

  onMounted(() => {
    mounted.value = true
  })

  if (!mounted.value) return null

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
      qrCodeUrl.value = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(window.location.href)
      isVisible.value = true
    } else if (item.url) {
      window.open(item.url, '_blank')
    }
  }

  const closeModal = () => {
    isVisible.value = false
  }

  return h('div', { class: 'share-container' }, [
    h('div', { class: 'share-buttons' }, [
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
    ]),
    isVisible.value ? h('div', { class: 'qr-modal', onClick: closeModal }, [
      h('div', { class: 'qr-content', onClick: (e: Event) => e.stopPropagation() }, [
        h('button', { class: 'qr-close', onClick: closeModal }, '×'),
        h('h3', { class: 'qr-title' }, '微信扫码分享'),
        h('img', { class: 'qr-image', src: qrCodeUrl.value, alt: '二维码' }),
        h('p', { class: 'qr-desc' }, '打开微信扫一扫，扫描二维码分享文章')
      ])
    ]) : null,
    h('style', { scoped: true }, `
      .share-container {
        position: relative;
      }
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
      .qr-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .qr-content {
        background: #fff;
        padding: 24px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      }
      .qr-close {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 32px;
        height: 32px;
        border: none;
        background: #f0f0f0;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        line-height: 1;
      }
      .qr-close:hover {
        background: #e0e0e0;
      }
      .qr-title {
        margin: 0 0 16px 0;
        font-size: 18px;
        color: #333;
      }
      .qr-image {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        margin-bottom: 12px;
      }
      .qr-desc {
        margin: 0;
        font-size: 14px;
        color: #666;
      }
    `)
  ])
}