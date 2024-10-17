import { createRouter, createWebHashHistory } from 'vue-router'
import { user, authPromise } from '../main'
const router = createRouter({
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
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  await authPromise // 確保 user 狀態已設置

  if (requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})
export default router
