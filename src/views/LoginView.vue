<script setup>
import { ref } from 'vue'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const loginEmail = ref('')
const loginPassword = ref('')

const loginUser = () => {
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      console.log('登入成功：', userCredential.user)
    })
    .catch((error) => {
      console.error('登入錯誤：', error.message)
    })
}
</script>
<template>
  <div class="container pt-5 vh-100 d-flex justify-content-center align-items-center">
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
          <form @submit.prevent="loginUser">
            <div class="mb-3">
              <label for="login-email" class="form-label">信箱</label>
              <input
                type="email"
                class="form-control"
                id="login-email"
                placeholder="name@example.com"
                v-model="loginEmail"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密碼</label>
              <input type="password" class="form-control" id="password" v-model="loginPassword" />
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button type="submit" class="btn btn-primary">登入</button>
              <RouterLink to="signup" class="link-primary">我要註冊</RouterLink>
            </div>
          </form>
        </div>
        <div
          class="tab-pane fade"
          id="signup-tab"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
          <form>
            <div class="mb-3">
              <label for="signup-email" class="form-label">信箱</label>
              <input
                type="email"
                class="form-control"
                id="signup-email"
                placeholder="name@example.com"
              />
            </div>
            <div class="mb-3">
              <label for="password1" class="form-label">密碼</label>
              <input type="password" class="form-control" id="password1" />
            </div>
            <div class="mb-3">
              <label for="password2" class="form-label">確認密碼</label>
              <input type="password" class="form-control" id="password2" />
            </div>
            <button class="btn btn-primary w-100">註冊</button>
          </form>
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
