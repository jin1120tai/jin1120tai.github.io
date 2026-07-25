<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { ref, watch, nextTick, onMounted } from 'vue'

const { isDark } = useData()
const route = useRoute()
const container = ref<HTMLElement | null>(null)

const giscusConfig = {
  repo: 'jin1120tai/jin1120tai.github.io',
  repoId: 'R_kgDOTLeaNg',
  category: 'Announcements',
  categoryId: 'DIC_kwDOTLeaNs4DB7OB',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'zh-CN',
  loading: 'lazy'
}

function isPostPage(path: string): boolean {
  return path.startsWith('/posts/') &&
    path !== '/posts/' &&
    path !== '/posts/index.html'
}

function loadGiscus() {
  if (typeof window === 'undefined') return
  if (!container.value) return
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
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', giscusConfig.lang)
  script.setAttribute('data-loading', giscusConfig.loading)
  script.crossOrigin = 'anonymous'
  script.async = true
  container.value.appendChild(script)
}

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

onMounted(() => {
  if (isPostPage(route.path)) loadGiscus()
})

watch(() => route.path, (path) => {
  nextTick(() => {
    if (isPostPage(path)) {
      loadGiscus()
    } else if (container.value) {
      container.value.innerHTML = ''
    }
  })
})

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
