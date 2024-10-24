import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      name: 'company',
      path: '/company/:id',
      component: () => import('../views/companyView.vue')
    },
    {
      name: 'contribute',
      path: '/contribute',
      component: () => import('../views/member/ContributeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 由於在 main.js 已初始化，這裡可以直接使用 authStore 的狀態
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})
export default router
