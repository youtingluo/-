<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/NavbarComponent.vue'
import { useAuthStore } from './store/auth'
import { useFavoriteStore } from './store/favorite'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()

onMounted(async () => {
  await authStore.initializeAuth()
  await favoriteStore.initializeFavorites()
})
</script>

<template>
  <Navbar />
  <RouterView />
</template>
