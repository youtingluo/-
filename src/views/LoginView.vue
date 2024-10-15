<script setup>
import { ref } from 'vue'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const loginEmail = ref('')
const loginPassword = ref('')
const resetEmail = ref('')
const isLoading = ref(false)
const message = ref('')
const errorMessage = ref('')
const loginUser = () => {
  isLoading.value = true
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      console.log('登入成功：', userCredential.user)
      isLoading.value = false
      router.push('/')
    })
    .catch((error) => {
      console.error('登入錯誤：', error.message)
      isLoading.value = false
    })
}
const isReset = ref(false)
const resetPassword = () => {
  sendPasswordResetEmail(auth, resetEmail.value)
    .then(() => {
      message.value = '密碼重設郵件已發送，請檢查您的郵箱。'
      errorMessage.value = ''
    })
    .catch((error) => {
      errorMessage.value = error.message
      message.value = ''
    })
}
</script>
<template>
  <div class="container pt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
    <h1 class="mb-5">登入頁面</h1>
    <div class="login-content">
      <ul class="nav nav-tabs" ref="loginTab" role="tablist">
        <li class="nav-item me-auto" role="presentation">
          <div class="nav-link active">登入</div>
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
          <div v-if="isReset">
            <form @submit.prevent="resetPassword">
              <div class="mb-3">
                <label for="reset-password" class="form-label">信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="reset-password"
                  placeholder="請輸入註冊時信箱"
                  v-model="resetEmail"
                />
              </div>

              <div class="d-flex justify-content-between align-items-center">
                <button
                  type="submit"
                  class="btn btn-primary flex-grow-1 me-2"
                  :disabled="isLoading"
                >
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  >
                  </span
                  >寄送信件
                </button>
                <a href="#" class="link-primary" @click.prevent="isReset = false">返回登入</a>
              </div>
            </form>
            <p v-if="message" class="text-success mt-2 mb-0">{{ message }}</p>
            <p v-if="errorMessage" class="text-danger mt-2 mb-0">{{ errorMessage }}</p>
          </div>
          <div v-else>
            <form @submit.prevent="loginUser">
              <div class="mb-3">
                <label for="login-email" class="form-label">信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="login-email"
                  placeholder="請輸入信箱"
                  v-model="loginEmail"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="請輸入密碼"
                  v-model="loginPassword"
                />
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <button type="submit" class="btn btn-primary flex-grow-1" :disabled="isLoading">
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  >
                  </span
                  >登入
                </button>
                <div>
                  <a href="#" class="link-primary p-2" @click.prevent="isReset = true">忘記密碼</a>|
                  <RouterLink to="signup" class="btn btn-outline-dark">前往註冊</RouterLink>
                </div>
              </div>
            </form>
          </div>
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
