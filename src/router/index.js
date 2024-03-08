import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/admin/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      alias: '/login',
      meta: {
        bodyClass: 'custom-body-style', 
      },
    },

    // admin
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: DashboardView
    },

    // users
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      component: () => import('../views/user/DashboardView.vue')
    },

    // wali
    {
      path: '/wali-dashboard',
      name: 'wali-dashboard',
      component: () => import('../views/wali/DashboardView.vue')
    },

    // pembimbing
    {
      path: '/pembimbing-dashboard',
      name: 'pembimbing-dashboard',
      component: () => import('../views/pembimbing/DashboardView.vue')
    },

    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/Unauthorized.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    }
  ]
})


export default router
