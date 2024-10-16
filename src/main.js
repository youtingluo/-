import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'

import './assets/scss/all.scss'
import 'vue-loading-overlay/dist/css/index.css'
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

const app = createApp(App)
app.use(router)
app.mount('#app')

export { firebaseApp }
