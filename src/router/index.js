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
      component: () => import('../views/companyView.vue'),
      props: (route) => ({ id: route.params.id, query: route.query })
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
      name: 'favorite',
      path: '/favorite',
      component: () => import('../views/member/FavoriteView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})
router.beforeEach((to, from, next) => {
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
