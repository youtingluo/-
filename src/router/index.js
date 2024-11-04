import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        if (from.path === '/') {
          next({ path: '/refresh', replace: true })
        } else {
          next()
        }
      }
    },
    {
      path: '/refresh',
      beforeEnter: (to, from, next) => {
        next('/')
      }
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
      name: 'userprofile',
      path: '/userprofile',
      component: () => import('../views/member/UserProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/' && from.path.includes('/company/')) {
    // 如果目標路徑是首頁，且沒有 search 參數
    if (to.path === '/' && Object.keys(from.query).length > 0) {
      // 檢查是否已經處理過 query（避免無限重定向）
      if (to.query && Object.keys(to.query).length > 0) {
        next() // 如果目標路由已經有 query，直接通過
      } else {
        // 複製當前的 query 到首頁
        next({
          path: '/',
          query: {
            selectedindustry: from.query.selectedindustry,
            MultipleTypeArray: from.query.MultipleTypeArray,
            selected: from.query.selected
          }
        })
      }
    }
    return
  }
  const authStore = useAuthStore()
  const checkAuth = () => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (requiresAuth && !authStore.isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  }

  if (!authStore.isInitialized) {
    authStore.initializeAuth().then(checkAuth)
  } else {
    checkAuth()
  }
})
export default router
