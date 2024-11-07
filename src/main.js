import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useAuthStore } from './store/auth'
import router from './router'
import sweetalert2 from './plugins/sweetalert2'
import './assets/scss/all.scss'
import 'vue-loading-overlay/dist/css/index.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
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

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(sweetalert2)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)

const authStore = useAuthStore()
authStore.initializeAuth()
app.mount('#app')
