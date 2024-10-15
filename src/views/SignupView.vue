<script setup>
import { ref } from 'vue'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const userName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const registerUser = () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '密碼不一致，請再次確認。'
    return
  }
  isLoading.value = true
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      updateProfile(user, { displayName: userName.value })
        .then(() => {
          console.log('註冊成功，顯示名稱已更新：', user.displayName)
          isLoading.value = false
          router.push('/login')
        })
        .catch((error) => {
          console.error('更新顯示名稱錯誤：', error.message)
          isLoading.value = false
        })
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        errorMessage.value = '此電子郵件地址已被使用。'
      } else {
        errorMessage.value = error.message
      }
      console.error('註冊錯誤：', error.message)
    })
}
</script>

<template>
  <div class="container pt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
    <h1 class="mb-5">註冊頁面</h1>
    <div class="login-content">
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
          <form @submit.prevent="registerUser">
            <div class="mb-3">
              <label for="signup-userName" class="form-label">暱稱</label>
              <input
                type="text"
                class="form-control"
                id="signup-userName"
                placeholder="輸入暱稱"
                v-model="userName"
              />
            </div>
            <div class="mb-3">
              <label for="signup-email" class="form-label">信箱</label>
              <input
                type="email"
                class="form-control"
                id="signup-email"
                placeholder="name@example.com"
                v-model="email"
              />
            </div>
            <div class="mb-3">
              <label for="password1" class="form-label">密碼</label>
              <input type="password" class="form-control" id="password1" v-model="password" />
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">確認密碼</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                v-model="confirmPassword"
              />
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button type="submit" class="btn btn-primary flex-grow-1 me-3" :disabled="isLoading">
                <span
                  v-if="isLoading"
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
          <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-content {
  width: 400px;
}
</style>
