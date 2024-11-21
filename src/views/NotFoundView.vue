<script setup>
import router from '@/router'
import { onMounted } from 'vue'

onMounted(() => {
  router.push('/')
})
</script>
<template>
  <div class="container">
    <h1>導向錯誤...請重新整理</h1>
  </div>
</template>
