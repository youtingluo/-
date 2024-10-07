import './assets/scss/all.scss'
import 'vue-loading-overlay/dist/css/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(router)

app.mount('#app')
