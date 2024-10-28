// stores/auth.js
import { defineStore } from 'pinia'
import { auth } from '@/utils/firebase'
import { swal } from '@/plugins/sweetalert2'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider
} from 'firebase/auth'
import router from '../router'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isInitialized: false,
    error: null,
    profileId: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    userEmail: (state) => state.user?.email,
    displayName: (state) => state.user?.displayName || '匿名'
  },

  actions: {
    // 初始化 Firebase 認證監聽
    async initializeAuth() {
      if (this.isAuthInitialized) {
        return Promise.resolve(false)
      }
      this.isAuthInitialized = true
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.isInitialized = true
          if (user) {
            user.providerData.forEach((profile) => {
              this.profileId = profile.providerId
              console.log('Sign-in provider: ' + profile.providerId)
            })
            this.user = user
            console.log(user)

            resolve(true)
          } else {
            this.user = null
            resolve(false)
          }
        })
      })
    },

    // 登入
    async login(email, password) {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)

        await user.reload() // 確保獲取最新的驗證狀態
        if (!user.emailVerified) {
          swal.fire({
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
    async validateRegistration(email, password, displayName) {
      try {
        // 只驗證帳密是否有效,不真正建立帳號
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // 如果沒有錯誤,刪除剛建立的帳號
        await userCredential.user.delete()

        // 顯示會員條款
        const result = await swal.fire({
          title: '會員條款',
          html: `
            <div class="text-left">
              <h3>一、會員資格</h3>
              <p>1. 需年滿18歲...</p>
              <h3>二、會員權利與義務</h3>
              <p>1. 會員有權...</p>
              <!-- 其他條款內容 -->
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: '我同意',
          cancelButtonText: '不同意',
          width: '600px',
          customClass: {
            container: 'terms-modal'
          }
        })

        if (result.isConfirmed) {
          // 用戶同意條款,執行真正的註冊
          try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(user, {
              displayName: displayName
            })
            sendEmailVerification(user).then(() => {
              swal.fire({
                text: '註冊成功！請前往註冊信箱驗證後再登入',
                icon: 'success'
              })
            })
            await signOut(auth)
            router.push('/login')
          } catch (error) {
            console.error('註冊失敗:', error)
            await swal.fire({
              icon: 'error',
              title: '註冊失敗',
              text: '請稍後再試'
            })
          }
        } else {
          router.push('/')
        }
      } catch (error) {
        // 處理驗證階段的錯誤
        let errorMessage = '發生錯誤,請稍後再試'

        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = '此信箱已經被註冊'
            break
          case 'auth/invalid-email':
            errorMessage = '請輸入有效的信箱格式'
            break
          case 'auth/operation-not-allowed':
            errorMessage = '註冊功能暫時無法使用'
            break
          case 'auth/weak-password':
            errorMessage = '密碼強度不足,請至少包含6個字元'
            break
        }

        await swal.fire({
          icon: 'error',
          title: '無法註冊',
          text: errorMessage
        })
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
    },
    setUser(user) {
      this.user = user
    },
    // 修改暱稱
    async updateDisplayName(newDisplayName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: newDisplayName
        })
        this.setUser({ ...auth.currentUser })
        console.log('DisplayName updated:', auth.currentUser.displayName)
      } catch (error) {
        console.error('個人資訊更新失敗', error)
        throw error
      }
    },
    async reauthenticate(currentPassword) {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
      try {
        await reauthenticateWithCredential(auth.currentUser, credential)
        console.log('重新驗證成功')
      } catch (error) {
        console.error('重新驗證失敗', error)
        throw error
      }
    },
    async updatePassword(newPassword) {
      try {
        await updatePassword(auth.currentUser, newPassword)
        console.log('密碼更新成功')
      } catch (error) {
        console.error('密碼更新失敗', error)
        throw error
      }
    }
  }
})
