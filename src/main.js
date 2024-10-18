import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/all.scss'
import 'vue-loading-overlay/dist/css/index.css'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min, numeric } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
defineRule('email', email)
defineRule('required', required)
defineRule('min', min)
defineRule('numeric', numeric)
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW')

const firebaseConfig = {
  apiKey: 'AIzaSyD5bMMUbcVKn0XhDjWNzZOZ0_YQwQjd2nU',
  authDomain: 'supply0-c8814.firebaseapp.com',
  projectId: 'supply0-c8814',
  storageBucket: 'supply0-c8814.appspot.com',
  messagingSenderId: '962012122682',
  appId: '1:962012122682:web:02fcacc808b2f35c50af03',
  measurementId: 'G-BG57GVVZ8X'
}
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
let user = null

const authPromise = new Promise((resolve) => {
  auth.onAuthStateChanged((authUser) => {
    user = authUser
    resolve()
  })
})
const app = createApp(App)
app.use(router)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')

export { firebaseApp, auth, user, authPromise }
