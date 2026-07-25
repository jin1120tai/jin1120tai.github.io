<script setup lang="ts">
import { useData } from 'vitepress'
const { site } = useData()
</script>

<template>
  <div class="not-found">
    <p class="code">404</p>
    <h1 class="title">页面走丢了</h1>
    <p class="subtitle">你想找的内容可能已被移动或从未存在。</p>
    <a class="back-home" href="/">返回首页</a>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 24px;
}

.code {
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  color: var(--vp-c-brand-1);
}

.title {
  margin: 16px 0 8px;
  font-size: 24px;
  font-weight: 600;
}

.subtitle {
  margin: 0 0 32px;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

.back-home {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-border);
  transition: background-color 0.25s, border-color 0.25s;
}

.back-home:hover {
  background-color: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}
</style>
