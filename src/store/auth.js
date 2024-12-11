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
    profileId: null,
    piniaLoading: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    userEmail: (state) => state.user?.email,
    displayName: (state) => state.user?.displayName || '匿名'
  },

  actions: {
    // 初始化 Firebase 認證監聽
    async initializeAuth() {
      console.log('初始化檢查登入')

      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.isInitialized = true
          if (user) {
            user.providerData.forEach((profile) => {
              this.profileId = profile.providerId
            })
            this.user = user

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
      this.piniaLoading = true
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await userCredential.user.delete()
        // 顯示會員條款
        const result = await swal.fire({
          title: '<p class="fs-5">Supply0 會員條款</p>',
          html: `
          <div class="fs-6 text-start" style="height: 400px; overflow-y: auto">
            <p class="mb-1">
              感謝您成為 Supply0 的會員！本條款為您提供服務範圍、會員權益及注意事項，協助您安心使用平台功能。
              </p>
            <p class="fw-bold">請詳閱以下條款，註冊及使用即表示您同意遵循。</p>
            <p>1. 會員資格與義務</p>
            <ul>
              <li class="mb-2">
                <small>1.1 會員須為具備完全行為能力的自然人或合法成立的法人，並依照本平台提供的註冊程序完成註冊。</small>
              </li>
              <li class="mb-2">
                <small>
                  1.2
                  會員應提供正確且完整的個人資料，如有任何變更，應即時更新。若因會員提供不實或未更新資料而導致任何損害，本平台不承擔責任。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  1.3
                  會員應妥善保管帳號與密碼，並對所有使用其帳號進行的行為負完全責任。如有帳號被盜用或有安全疑慮，應立即通知本平台。
                </small>
              </li>
            </ul>
      
            <p>2. 平台服務範疇</p>
            <ul>
              <li class="mb-2">
                <small>
                  2.1 Supply0
                  為原料供應廠商的資訊聚合平台，旨在協助會員搜尋及比較原料供應商之相關資料。因資訊來源眾多，本平台無法保證所有內容的時效性、準確性或完整性。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  2.2
                  所有內容僅供參考，並不構成任何專業建議。會員需自行判斷並依需求選擇供應商，所有後續決策和行動均屬個人責任範疇。
                </small>
              </li>
            </ul>
      
            <p>3. 免責說明</p>
            <ul>
              <li class="mb-2">
                <small>
                  3.1 Supply0
                  盡可能確保平台資料的多元性，但因資料由各供應方提供或來自第三方，本平台不保證資訊完全無誤或適用於您的特定需求。任何基於平台資訊的決策與風險均需由會員自行評估。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  3.2
                  平台上的資訊更新不一定即時，且會員對於與供應商進行的任何後續互動、交流或交易，均屬會員和供應商間的個別行為。本平台無法參與或擔保任何交易結果。
                </small>
              </li>
            </ul>
      
            <p>4. 責任限制</p>
            <ul>
              <li class="mb-2">
                <small>
                  4.1 Supply0
                  僅為資訊提供方，不參與會員與供應商之間的任何商業行為，因此對於因使用或無法使用本平台資訊所造成的任何直接或間接損失（包括但不限於利潤損失、商譽損害等），本平台不負責。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  4.2
                  本平台提供的服務若因系統維護、不可抗力事件（如自然災害、網絡中斷等）或其他無法控制的因素暫時中止或變更，會員同意平台無需承擔因此造成的任何損害賠償。
                </small>
              </li>
            </ul>
      
            <p>5. 隱私保護與資訊安全</p>
            <ul>
              <li class="mb-2">
                <small>
                  5.1
                  我們尊重會員的隱私權，並根據隱私政策妥善管理您的個人資料。會員提供的所有資料僅限於本平台使用，除法律規定或政府機關要求外，不會向第三方公開。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  5.2
                  雖平台將採取合理技術措施保障資料安全，但無法完全防範任何潛在風險，會員同意此性質之平台安全保護。
                </small>
              </li>
            </ul>
      
            <p>6. 資訊的使用建議</p>
            <ul>
              <li class="mb-2">
                <small>
                  6.1
                  本平台建議會員在與供應商進行聯繫或交易前，自行進行審慎評估，並可結合其他市場資訊參考。會員承諾於平台上發表的內容為真實、合法，並承擔所有因此內容所引發的法律責任。
                </small>
              </li>
            </ul>
      
            <p>7. 服務調整及終止</p>
            <ul>
              <li class="mb-2">
                <small>
                  7.1
                  本平台保留隨時修正、變更或暫停服務之權利。為提升會員體驗或配合政策要求，平台可能進行系統維護或調整而暫停部分功能，平台將盡量提前通知。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  7.2
                  本平台有權根據個別情況暫停或終止會員資格，若會員行為影響其他會員使用或違反本條款，Supply0有權終止服務且不另行通知。
                </small>
              </li>
            </ul>
      
            <p>8. 知識產權</p>
            <ul>
              <li class="mb-2">
                <small>8.1
                本平台之內容，包括但不限於文字、標誌、圖片等，均受著作權及智慧財產權保護，未經本平台書面許可，會員不得擅自使用。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  8.2
                  會員上傳或發布的內容，如包含第三方知識產權，會員須確保獲得授權。任何因此產生的法律問題，均由會員自行承擔。
                </small>
              </li>
            </ul>
      
            <small>
              <strong>重要提醒：</strong
              >使用本平台表示您已了解並同意平台提供的服務性質及免責聲明。請確保您完全理解本條款內容，若不接受條款，請勿註冊或使用本平台服務。
            </small>
          </div>`,
          showCloseButton: true,
          backdrop: false,
          showCancelButton: true,
          confirmButtonText: `<span class="material-symbols-outlined d-inline-block align-middle">
          check_circle
          </span> 同意`,
          cancelButtonText: `<span class="material-symbols-outlined  d-inline-block align-middle">
          cancel
          </span> 不同意`
        })

        if (result.isConfirmed) {
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
            await swal.fire({
              icon: 'error',
              title: '註冊失敗',
              text: '請稍後再試'
            })
          }
        } else {
          router.push('/')
        }
        return false
      } catch (error) {
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
        return false
      } finally {
        this.piniaLoading = false
      }
    },
    async loginWithGoogle() {
      this.piniaLoading = true
      const provider = new GoogleAuthProvider()
      const result = await swal.fire({
        title: '<p class="fs-5">Supply0 會員條款</p>',
        html: `
          <div class="fs-6 text-start" style="height: 400px; overflow-y: auto">
            <p class="mb-1">
              感謝您成為 Supply0 的會員！本條款為您提供服務範圍、會員權益及注意事項，協助您安心使用平台功能。
              </p>
            <p class="fw-bold">請詳閱以下條款，註冊及使用即表示您同意遵循。</p>
            <p>1. 會員資格與義務</p>
            <ul>
              <li class="mb-2">
                <small>1.1 會員須為具備完全行為能力的自然人或合法成立的法人，並依照本平台提供的註冊程序完成註冊。</small>
              </li>
              <li class="mb-2">
                <small>
                  1.2
                  會員應提供正確且完整的個人資料，如有任何變更，應即時更新。若因會員提供不實或未更新資料而導致任何損害，本平台不承擔責任。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  1.3
                  會員應妥善保管帳號與密碼，並對所有使用其帳號進行的行為負完全責任。如有帳號被盜用或有安全疑慮，應立即通知本平台。
                </small>
              </li>
            </ul>
      
            <p>2. 平台服務範疇</p>
            <ul>
              <li class="mb-2">
                <small>
                  2.1 Supply0
                  為原料供應廠商的資訊聚合平台，旨在協助會員搜尋及比較原料供應商之相關資料。因資訊來源眾多，本平台無法保證所有內容的時效性、準確性或完整性。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  2.2
                  所有內容僅供參考，並不構成任何專業建議。會員需自行判斷並依需求選擇供應商，所有後續決策和行動均屬個人責任範疇。
                </small>
              </li>
            </ul>
      
            <p>3. 免責說明</p>
            <ul>
              <li class="mb-2">
                <small>
                  3.1 Supply0
                  盡可能確保平台資料的多元性，但因資料由各供應方提供或來自第三方，本平台不保證資訊完全無誤或適用於您的特定需求。任何基於平台資訊的決策與風險均需由會員自行評估。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  3.2
                  平台上的資訊更新不一定即時，且會員對於與供應商進行的任何後續互動、交流或交易，均屬會員和供應商間的個別行為。本平台無法參與或擔保任何交易結果。
                </small>
              </li>
            </ul>
      
            <p>4. 責任限制</p>
            <ul>
              <li class="mb-2">
                <small>
                  4.1 Supply0
                  僅為資訊提供方，不參與會員與供應商之間的任何商業行為，因此對於因使用或無法使用本平台資訊所造成的任何直接或間接損失（包括但不限於利潤損失、商譽損害等），本平台不負責。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  4.2
                  本平台提供的服務若因系統維護、不可抗力事件（如自然災害、網絡中斷等）或其他無法控制的因素暫時中止或變更，會員同意平台無需承擔因此造成的任何損害賠償。
                </small>
              </li>
            </ul>
      
            <p>5. 隱私保護與資訊安全</p>
            <ul>
              <li class="mb-2">
                <small>
                  5.1
                  我們尊重會員的隱私權，並根據隱私政策妥善管理您的個人資料。會員提供的所有資料僅限於本平台使用，除法律規定或政府機關要求外，不會向第三方公開。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  5.2
                  雖平台將採取合理技術措施保障資料安全，但無法完全防範任何潛在風險，會員同意此性質之平台安全保護。
                </small>
              </li>
            </ul>
      
            <p>6. 資訊的使用建議</p>
            <ul>
              <li class="mb-2">
                <small>
                  6.1
                  本平台建議會員在與供應商進行聯繫或交易前，自行進行審慎評估，並可結合其他市場資訊參考。會員承諾於平台上發表的內容為真實、合法，並承擔所有因此內容所引發的法律責任。
                </small>
              </li>
            </ul>
      
            <p>7. 服務調整及終止</p>
            <ul>
              <li class="mb-2">
                <small>
                  7.1
                  本平台保留隨時修正、變更或暫停服務之權利。為提升會員體驗或配合政策要求，平台可能進行系統維護或調整而暫停部分功能，平台將盡量提前通知。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  7.2
                  本平台有權根據個別情況暫停或終止會員資格，若會員行為影響其他會員使用或違反本條款，Supply0有權終止服務且不另行通知。
                </small>
              </li>
            </ul>
      
            <p>8. 知識產權</p>
            <ul>
              <li class="mb-2">
                <small>8.1
                本平台之內容，包括但不限於文字、標誌、圖片等，均受著作權及智慧財產權保護，未經本平台書面許可，會員不得擅自使用。
                </small>
              </li>
              <li class="mb-2">
                <small>
                  8.2
                  會員上傳或發布的內容，如包含第三方知識產權，會員須確保獲得授權。任何因此產生的法律問題，均由會員自行承擔。
                </small>
              </li>
            </ul>
      
            <small>
              <strong>重要提醒：</strong
              >使用本平台表示您已了解並同意平台提供的服務性質及免責聲明。請確保您完全理解本條款內容，若不接受條款，請勿註冊或使用本平台服務。
            </small>
          </div>`,
        showCloseButton: true,
        backdrop: false,
        showCancelButton: true,
        confirmButtonText: `<span class="material-symbols-outlined d-inline-block align-middle">
          check_circle
          </span> 同意`,
        cancelButtonText: `<span class="material-symbols-outlined  d-inline-block align-middle">
          cancel
          </span> 不同意`
      })
      if (result.isConfirmed) {
        try {
          const { user } = await signInWithPopup(auth, provider)
          this.user = user
          this.piniaLoading = false
        } catch (error) {
          this.piniaLoading = false
          await swal.fire({
            icon: 'error',
            title: '登入失敗',
            text: error || '發生未知錯誤'
          })
        }
      } else {
        this.piniaLoading = false
        router.push('/')
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
        await swal.fire({
          icon: 'error',
          title: '登出失敗',
          text: err
        })
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
      } catch (error) {
        await swal.fire({
          icon: 'error',
          title: '更新暱稱失敗',
          text: error
        })
      }
    },
    async reauthenticate(currentPassword, newPassword) {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
      try {
        await reauthenticateWithCredential(auth.currentUser, credential)
        this.updatePassword(newPassword)
      } catch (error) {
        await swal.fire({
          icon: 'error',
          title: '密碼不正確',
          text: error
        })
        return false
      }
    },
    async updatePassword(newPassword) {
      try {
        await updatePassword(auth.currentUser, newPassword)
        await swal.fire({
          icon: 'success',
          title: '密碼更新成功'
        })
      } catch (error) {
        await swal.fire({
          icon: 'error',
          title: '密碼更新失敗',
          text: error
        })
      }
    }
  }
})
