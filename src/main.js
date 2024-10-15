import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/all.scss'
import 'vue-loading-overlay/dist/css/index.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
