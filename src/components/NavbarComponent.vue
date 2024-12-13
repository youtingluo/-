<script setup>
import { useAuthStore } from '@/store/auth'
import { inject, ref, onMounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Dropdown from 'bootstrap/js/dist/dropdown'
import 'bootstrap/dist/js/bootstrap.bundle'
const router = useRouter()
const route = useRoute()
const toast = inject('$toast')
const authStore = useAuthStore()
const dropdownRef = ref(null)
let dropdownInstance = null
const handleLogoClick = () => {
  if (route.path === '/') {
    router.push('/refresh')
  } else {
    router.push('/')
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    toast.fire({
      icon: 'success',
      title: '登出成功'
    })
    await router.push('/')
    router.go(0)
  } catch (error) {
    console.error('登出失敗:', error)
  }
}
const toggleDropdown = () => {
  if (dropdownInstance) {
    dropdownInstance.toggle()
  }
}
const initDropdown = async () => {
  await nextTick()
  if (dropdownRef.value) {
    dropdownInstance = new Dropdown(dropdownRef.value.querySelector('.dropdown-toggle'))
  }
}

onMounted(() => {
  initDropdown()
})

watch(router.currentRoute, () => {
  initDropdown()
})
</script>
<template>
  <nav class="navbar bg-white shadow-sm sticky-top">
    <div class="container">
      <div class="d-flex w-100 align-items-center">
        <div>
          <a href="#" @click.prevent="handleLogoClick" class="navbar-brand">
            <img src="../assets/LOGO.png" alt="LOGO" />
          </a>
        </div>
        <div class="ms-auto">
          <div
            class="dropdown d-flex align-items-center"
            ref="dropdownRef"
            @click="toggleDropdown"
            v-if="authStore.isLoggedIn"
          >
            <span v-if="authStore.user">嗨！{{ authStore.user.displayName }}</span>
            <RouterLink
              v-if="route.name !== 'company' && route.name !== 'contribute'"
              class="btn btn-sm btn-primary ms-2"
              to="/contribute"
              >前往投稿</RouterLink
            >
            <button
              data-bs-toggle="dropdown"
              class="btn bg-transparent border-0 dropdown-toggle"
              type="button"
              aria-expanded="false"
            >
              <span
                class="material-symbols-outlined text-primary d-inline-block align-middle"
                aria-expanded="false"
              >
                account_circle
              </span>
            </button>

            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/userprofile">
                  <span class="material-symbols-outlined d-inline-block align-middle me-1">
                    face </span
                  >會員中心</RouterLink
                >
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/favorite">
                  <span class="material-symbols-outlined d-inline-block align-middle me-1">
                    collections_bookmark </span
                  >我的收藏</RouterLink
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" @click.prevent="handleLogout">
                  <span class="material-symbols-outlined d-inline-block align-middle me-1">
                    logout </span
                  >登出</a
                >
              </li>
            </ul>
          </div>
          <div v-else>
            <RouterLink class="btn btn-primary" to="/login">登入/註冊</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
