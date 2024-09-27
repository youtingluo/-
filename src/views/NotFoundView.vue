<script setup>
import router from '@/router'
import { onMounted } from 'vue'

onMounted(() => {
  router.push('/')
})
</script>
<template>
  <div>
    <h1>404 NOT FOUND</h1>
  </div>
</template>
