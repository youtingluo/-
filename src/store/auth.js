// stores/auth.js
import { defineStore } from 'pinia'
import { auth } from '@/utils/firebase'
import Swal from 'sweetalert2'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    userEmail: (state) => state.user?.email,
    displayName: (state) => state.user?.displayName || '匿名'
  },

  actions: {
    // 初始化 Firebase 認證監聽
    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
        this.loading = false
      })
    },

    // 登入
    async login(email, password) {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)

        await user.reload() // 確保獲取最新的驗證狀態
        if (!user.emailVerified) {
          Swal.fire({
            title: '請先前往信箱驗證再登入',
            icon: 'error'
          })
          await signOut(auth) // 確保未驗證用戶登出
          return false
        }

        this.user = user
        this.error = null
        return true
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    // 註冊
    async register({ email, password, displayName }) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        // 設置 displayName
        await updateProfile(user, {
          displayName: displayName
        })
        sendEmailVerification(user).then(() => {
          Swal.fire({
            text: '註冊成功！請前往註冊信箱驗證後再登入',
            icon: 'success'
          })
        })
        await signOut(auth)
        this.error = null
      } catch (err) {
        this.error = err.message
        throw err
      }
    },
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        // 可以設置其他 Google 登入選項
        // provider.setCustomParameters({
        //   prompt: 'select_account'
        // })
        const { user } = await signInWithPopup(auth, provider)
        this.user = user
        this.error = null
        return true
      } catch (err) {
        this.error = err.message
        throw err
      }
    },
    // 登出
    async logout() {
      try {
        await signOut(auth)
        this.user = null
        this.error = null
      } catch (err) {
        this.error = err.message
        throw err
      }
    }
  }
})
