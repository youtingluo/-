import './assets/scss/all.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/js/dist/collapse'
const app = createApp(App)

app.use(router)

app.mount('#app')
