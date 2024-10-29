<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const userName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
// 使用 storeToRefs 來保持響應性
const { piniaLoading } = storeToRefs(authStore)
const validateRegistration = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '密碼與確認密碼不相符'
    return
  }
  errorMessage.value = ''
  authStore.validateRegistration(email.value, password.value, userName.value)
}
</script>

<template>
  <div class="container py-3">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <h1 class="mb-3 text-center">註冊</h1>
        <ul class="nav nav-tabs" ref="loginTab" role="tablist">
          <li class="nav-item me-auto" role="presentation">
            <div class="nav-link active">註冊</div>
          </li>
          <li class="nav-item" role="presentation">
            <RouterLink class="nav-link text-dark fs-6" to="/"
              ><span class="material-symbols-outlined d-inline-block align-bottom"> home </span
              >回首頁</RouterLink
            >
          </li>
        </ul>
        <div class="tab-content bg-white p-3 rounded" id="myTabContent">
          <div class="tab-pane show active">
            <form @submit.prevent="validateRegistration">
              <div class="mb-3">
                <label for="signup-userName" class="form-label">暱稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="signup-userName"
                  placeholder="請輸入暱稱"
                  v-model="userName"
                />
              </div>
              <div class="mb-3">
                <label for="signup-email" class="form-label">信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="signup-email"
                  placeholder="請輸入電子信箱"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <label for="password1" class="form-label">密碼</label>
                <input
                  type="password"
                  class="form-control"
                  id="password1"
                  placeholder="請輸入密碼"
                  v-model="password"
                />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">確認密碼</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  placeholder="請再次輸入密碼"
                  v-model="confirmPassword"
                />
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  type="submit"
                  class="btn btn-primary flex-grow-1 me-3"
                  :disabled="piniaLoading || !userName || !email || !password || !confirmPassword"
                >
                  <span
                    v-if="piniaLoading"
                    class="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  >
                  </span>
                  註冊
                </button>
                <RouterLink to="login" class="btn btn-outline-dark">前往登入</RouterLink>
              </div>
            </form>
            <p v-if="errorMessage" class="text-danger mt-1">
              <span class="material-symbols-outlined d-inline-block align-middle"> cancel </span>
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
