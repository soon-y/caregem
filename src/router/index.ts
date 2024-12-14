import { createRouter, createWebHistory } from 'vue-router'
import TodayView from '@/views/TodayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodayView,
    },
    {
      path: '/medications',
      name: 'medications',
      component: () => import('../views/PillsView.vue'),
    },
    {
      path: '/records',
      name: 'records',
      component: () => import('../views/RecordsView.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
    },
    {
      path: '/medications/add',
      name: 'add',
      component: () => import('../views/AddMedicationView.vue'),
    },
  ],
})

export default router
