<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { ref, watch, nextTick, onMounted } from 'vue'

// VitePress 提供的响应式数据：isDark 跟踪当前主题
const { isDark } = useData()
const route = useRoute()
const container = ref<HTMLElement | null>(null)

// Giscus 配置（从原 config.ts 的 comment 块迁移）
const giscusConfig = {
  repo: 'jin1120tai/jin1120tai.github.io',
  repoId: 'R_kgDOKn4a8Q',
  category: 'Comments',
  categoryId: 'DIC_kwDOKn4a8c4C0f6k',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'zh-CN',
  loading: 'lazy'
}

// 动态创建 Giscus script 并注入容器
function loadGiscus() {
  if (typeof window === 'undefined') return
  if (!container.value) return
  // 清空旧内容，避免页面切换时残留上一篇文章的评论
  container.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', giscusConfig.repo)
  script.setAttribute('data-repo-id', giscusConfig.repoId)
  script.setAttribute('data-category', giscusConfig.category)
  script.setAttribute('data-category-id', giscusConfig.categoryId)
  script.setAttribute('data-mapping', giscusConfig.mapping)
  script.setAttribute('data-strict', giscusConfig.strict)
  script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled)
  script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata)
  script.setAttribute('data-input-position', giscusConfig.inputPosition)
  // 根据当前主题选择 light / dark
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', giscusConfig.lang)
  script.setAttribute('data-loading', giscusConfig.loading)
  script.crossOrigin = 'anonymous'
  script.async = true
  container.value.appendChild(script)
}

// 主题切换时通过 postMessage 通知 Giscus 更新主题（无需重新加载）
function updateGiscusTheme() {
  if (typeof window === 'undefined') return
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: isDark.value ? 'dark' : 'light' } } },
      'https://giscus.app'
    )
  }
}

// 组件挂载后加载评论（onMounted 仅在客户端运行，SSR 安全）
onMounted(() => {
  loadGiscus()
})

// 页面切换时：文章页重新加载评论，非文章页清空
watch(() => route.path, (path) => {
  nextTick(() => {
    if (path.startsWith('/posts/')) {
      loadGiscus()
    } else if (container.value) {
      container.value.innerHTML = ''
    }
  })
})

// 主题切换时：通过 postMessage 更新 Giscus 主题
watch(isDark, () => {
  updateGiscusTheme()
})
</script>

<template>
  <div ref="container" class="giscus-wrapper" />
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 24px;
}
</style>
