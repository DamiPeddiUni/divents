import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/Views/HomeView'
import DetailView from '@/Views/DetailView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/event/:id',
    name: 'event_detail',
    component: DetailView,
    meta: {
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
