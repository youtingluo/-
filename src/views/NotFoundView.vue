<script setup>
import router from '@/router'
import { onMounted } from 'vue'

onMounted(() => {
  router.push('/')
})
</script>
<template>
  <div class="container">
    <h1>重新導向...請稍候，如未導向請重新整理</h1>
  </div>
</template>
