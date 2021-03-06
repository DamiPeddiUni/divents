import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/Views/HomeView'
import DetailView from '@/Views/DetailView'
import AuthView from '@/Views/AuthView'
import CompleteProfileView from '@/Views/CompleteProfileView'
import EventCreationView from '@/Views/EventCreationView'
import ValidateView from '@/Views/ValidateView'
import subscriptionView from '@/Views/subscriptionView'
import profileView from '@/Views/profileView'

import {getAuth, onAuthStateChanged} from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false,
      onlyNotAuth: false,
    }
  },
  {
    path: '/event/:id',
    name: 'event_detail',
    component: DetailView,
    meta: {
      requiresAuth: false,
      onlyNotAuth: false,
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    meta: {
      requiresAuth: false,
      onlyNotAuth: true,
    }
  },
  {
    path: '/completeProfile',
    name: 'completeProfile',
    component: CompleteProfileView,
    meta: {
      requiresAuth: false,
      onlyNotAuth: false,
    }
  },
  {
    path: '/createEvent',
    name: 'createEvent',
    component: EventCreationView,
    meta: {
      requiresAuth: true,
      onlyNotAuth: false,
    }
  },
  {
    path: '/validate/:id',
    name: 'validate',
    component: ValidateView,
    meta: {
      requiresAuth: true,
      onlyNotAuth: false,
    }
  },
  {
    path: '/profile/mySubscriptions',
    name: 'My Subscription',
    component: subscriptionView,
    meta:{
      requiresAuth: true,
      onlyNotAuth: false,
    }
  },
  {
    path: '/profile/:id',
    name: 'Profile view',
    component: profileView,
    meta:{
      requiresAuth: false,
      onlyNotAuth: false,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function checkTokenPresence(){
  return localStorage.getItem('userToken')
}


router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser() && checkTokenPresence()) {
      next()
    } else {
      next('/auth')
    }
  } else if (to.matched.some((record) => record.meta.onlyNotAuth)) {
    if (await getCurrentUser()) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(), 
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  })
}

export default router
