import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/company/:id',
      component: () => import('../views/companyView.vue')
    },
    {
      path: '/search',
      component: () => import('../views/SearchView.vue')
    }
  ]
})

export default router
