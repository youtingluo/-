<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const userName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const memberAgree = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const validateRegistration = async () => {
  authStore.validateRegistration(email.value, password.value, userName.value)
}

// const registerUser = async () => {
//   // swal
//   //   .fire({
//   //     title: 'Supply0 會員條款',
//   //     html: `
//   //   <div class="fs-6 text-start" style="height: 400px; overflow-y: auto">
//   //     <p class="fs-5">
//   //       感謝您成為Supply0的會員！本條款為您提供服務範圍、會員權益及注意事項，協助您安心使用平台功能。請詳閱以下條款，註冊及使用即表示您同意遵循。
//   //     </p>

//   //     <p class="fs-5">1. 會員資格與義務</p>
//   //     <ul>
//   //       <li class="mb-2">
//   //         1.1 會員須為具備完全行為能力的自然人或合法成立的法人，並依照本平台提供的註冊程序完成註冊。
//   //       </li>
//   //       <li class="mb-2">
//   //         1.2
//   //         會員應提供正確且完整的個人資料，如有任何變更，應即時更新。若因會員提供不實或未更新資料而導致任何損害，本平台不承擔責任。
//   //       </li>
//   //       <li class="mb-2">
//   //         1.3
//   //         會員應妥善保管帳號與密碼，並對所有使用其帳號進行的行為負完全責任。如有帳號被盜用或有安全疑慮，應立即通知本平台。
//   //       </li>
//   //     </ul>

//   //     <p class="fs-5">2. 平台服務範疇</p>
//   //     <ul>
//   //       <li class="mb-2">
//   //         2.1 Supply0
//   //         為原料供應廠商的資訊聚合平台，旨在協助會員搜尋及比較原料供應商之相關資料。因資訊來源眾多，本平台無法保證所有內容的時效性、準確性或完整性。
//   //       </li>
//   //       <li class="mb-2">
//   //         2.2
//   //         所有內容僅供參考，並不構成任何專業建議。會員需自行判斷並依需求選擇供應商，所有後續決策和行動均屬個人責任範疇。
//   //       </li>
//   //     </ul>

//   //     <p class="fs-5">3. 免責說明</p>
//   //     <ul>
//   //       <li class="mb-2">
//   //         3.1 Supply0
//   //         盡可能確保平台資料的多元性，但因資料由各供應方提供或來自第三方，本平台不保證資訊完全無誤或適用於您的特定需求。任何基於平台資訊的決策與風險均需由會員自行評估。
//   //       </li>
//   //       <li class="mb-2">
//   //         3.2
//   //         平台上的資訊更新不一定即時，且會員對於與供應商進行的任何後續互動、交流或交易，均屬會員和供應商間的個別行為。本平台無法參與或擔保任何交易結果。
//   //       </li>
//   //     </ul>

//   //     <p class="fs-5">4. 責任限制</p>
//   //     <ul>
//   //       <li class="mb-2">
//   //         4.1 Supply0
//   //         僅為資訊提供方，不參與會員與供應商之間的任何商業行為，因此對於因使用或無法使用本平台資訊所造成的任何直接或間接損失（包括但不限於利潤損失、商譽損害等），本平台不負責。
//   //       </li>
//   //       <li class="mb-2">
//   //         4.2
//   //         本平台提供的服務若因系統維護、不可抗力事件（如自然災害、網絡中斷等）或其他無法控制的因素暫時中止或變更，會員同意平台無需承擔因此造成的任何損害賠償。
//   //       </li>
//   //     </ul>

//   //     <p class="fs-5">5. 隱私保護與資訊安全</p>
//   //     <ul>
//   //       <li class="mb-2">
//   //         5.1
//   //         我們尊重會員的隱私權，並根據隱私政策妥善管理您的個人資料。會員提供的所有資料僅限於本平台使用，除法律規定或政府機關要求外，不會向第三方公開。
//   //       </li>
//   //       <li class="mb-2">
//   //         5.2
//   //         雖平台將採取合理技術措施保障資料安全，但無法完全防範任何潛在風險，會員同意此性質之平台安全保護。
//   //       </li>
//   //     </ul>

//   //     <p class="fs-5">6. 資訊的使用建議</p>
//   //     <ul>
//   //       <li class="mb-2">
//   //         6.1
//   //         本平台建議會員在與供應商進行聯繫或交易前，自行進行審慎評估，並可結合其他市場資訊參考。會員承諾於平台上發表的內容為真實、合法，並承擔所有因此內容所引發的法律責任。
//   //       </li>
//   //     </ul>

//   //     <p class="fs-5">7. 服務調整及終止</p>
//   //     <ul>
//   //       <li class="mb-2">
//   //         7.1
//   //         本平台保留隨時修正、變更或暫停服務之權利。為提升會員體驗或配合政策要求，平台可能進行系統維護或調整而暫停部分功能，平台將盡量提前通知。
//   //       </li>
//   //       <li class="mb-2">
//   //         7.2
//   //         本平台有權根據個別情況暫停或終止會員資格，若會員行為影響其他會員使用或違反本條款，Supply0有權終止服務且不另行通知。
//   //       </li>
//   //     </ul>

//   //     <p class="fs-5">8. 知識產權</p>
//   //     <ul>
//   //       <li class="mb-2">
//   //         8.1
//   //         本平台之內容，包括但不限於文字、標誌、圖片等，均受著作權及智慧財產權保護，未經本平台書面許可，會員不得擅自使用。
//   //       </li>
//   //       <li class="mb-2">
//   //         8.2
//   //         會員上傳或發布的內容，如包含第三方知識產權，會員須確保獲得授權。任何因此產生的法律問題，均由會員自行承擔。
//   //       </li>
//   //     </ul>

//   //     <p>
//   //       <strong>重要提醒：</strong
//   //       >使用本平台表示您已了解並同意平台提供的服務性質及免責聲明。請確保您完全理解本條款內容，若不接受條款，請勿註冊或使用本平台服務。
//   //     </p>
//   //   </div>`,
//   //     showCancelButton: true,
//   //     confirmButtonText: '同意',
//   //     cancelButtonText: '不同意'
//   //   })
//   //   .then((result) => {
//   //     if (result.isConfirmed) {
//   //       memberAgree.value = 'agree'
//   //     }
//   //   })
//   if (password.value !== confirmPassword.value) {
//     errorMessage.value = '密碼不一致，請再次確認。'
//     return
//   }
//   isLoading.value = true
//   try {
//     await authStore.register({
//       email: email.value,
//       password: password.value,
//       displayName: userName.value
//     })
//     isLoading.value = false
//     router.push('/login')
//   } catch (error) {
//     isLoading.value = false
//     if (error.code === 'auth/email-already-in-use') {
//       errorMessage.value = '此信箱已被使用。'
//     } else if (error.code === 'auth/invalid-email') {
//       errorMessage.value = '信箱格式不正確'
//     } else if (error.code === 'auth/missing-password') {
//       errorMessage.value = `請輸入密碼`
//     } else if (error.code === 'auth/weak-password') {
//       errorMessage.value = `密碼強度不足`
//     } else {
//       errorMessage.value = error.code
//     }
//   }
// }
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
              <div class="mb-3">
                <p>我已閱讀「 隱私權條款 」並同意</p>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="agree"
                    value="agree"
                    v-model="memberAgree"
                  />
                  <label class="form-check-label" for="agree"> 同意 </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="disagree"
                    value="disagree"
                    v-model="memberAgree"
                  />
                  <label class="form-check-label" for="disagree"> 不同意 </label>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  type="submit"
                  class="btn btn-primary flex-grow-1 me-3"
                  :disabled="isLoading || !userName || !email || !password || !confirmPassword"
                >
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
