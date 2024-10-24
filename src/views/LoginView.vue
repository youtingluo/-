<script setup>
import { ref, inject } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const toast = inject('$toast')
const router = useRouter()
const loginEmail = ref('')
const loginPassword = ref('')
const resetEmail = ref('')
const isLoading = ref(false)
const message = ref('')
const errorMessage = ref('')
const loginUser = async () => {
  isLoading.value = true
  try {
    await authStore.login(loginEmail.value, loginPassword.value)
    toast.fire({
      icon: 'success',
      title: '登入成功'
    })
    isLoading.value = false
    router.push('/')
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      errorMessage.value = '帳號或密碼不正確'
    } else if (error.code === 'auth/invalid-email') {
      errorMessage.value = '信箱格式不正確'
    }
    isLoading.value = false
  }
  // signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  //   .then(() => {
  //     toast.fire({
  //       icon: 'success',
  //       title: '登入成功'
  //     })
  //     isLoading.value = false
  //     router.push('/')
  //   })
  //   .catch((error) => {
  //     if (error.code === 'auth/invalid-credential') {
  //       errorMessage.value = '帳號或密碼不正確'
  //     } else if (error.code === 'auth/invalid-email') {
  //       errorMessage.value = '信箱格式不正確'
  //     }
  //     isLoading.value = false
  //   })
}
const isReset = ref(false)
// const resetPassword = () => {
//   isLoading.value = true
//   sendPasswordResetEmail(auth, resetEmail.value)
//     .then(() => {
//       isLoading.value = false
//       message.value = '密碼重設郵件已發送，請檢查您的郵箱。'
//       errorMessage.value = ''
//     })
//     .catch((error) => {
//       isLoading.value = false
//       errorMessage.value = error.message
//       message.value = ''
//     })
// }
// const signInWithGoogle = async () => {
//   isLoading.value = true
//   errorMessage.value = ''
//   const provider = new GoogleAuthProvider()
//   await signInWithPopup(auth, provider)
//     .then(() => {
//       isLoading.value = false
//       toast.fire({
//         icon: 'success',
//         title: '登入成功'
//       })
//       router.push('/')
//     })
//     .catch((error) => {
//       errorMessage.value = `Google 登入失敗：${error.message}`
//     })
//     .finally(() => {
//       isLoading.value = false
//     })
// }
const handleGoogleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    await authStore.loginWithGoogle()
    router.push('/')
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <h1 class="mb-3 text-center">登入</h1>
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
                  <button
                    type="submit"
                    class="btn btn-primary flex-grow-1 text-white me-1"
                    :disabled="isLoading || !loginEmail || !loginPassword"
                  >
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
                    <RouterLink to="signup" class="btn btn-outline-dark">前往註冊</RouterLink>
                  </div>
                </div>
              </form>

              <p v-if="errorMessage" class="text-danger my-1">
                <span class="material-symbols-outlined d-inline-block align-middle"> cancel </span>
                {{ errorMessage }}
              </p>
              <hr />
              <button @click.prevent="handleGoogleLogin" class="btn btn-outline-danger mb-2 w-100">
                <span
                  v-if="isLoading"
                  class="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                >
                </span>
                <i class="bi bi-google me-2"></i>用 Google 帳號登入
              </button>
              <a
                href="#"
                class="link-primary text-end"
                @click.prevent="
                  () => {
                    isReset = true
                    errorMessage = ''
                  }
                "
                ><span class="material-symbols-outlined d-inline-block align-middle fs-6">
                  help </span
                >忘記密碼</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
