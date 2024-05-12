import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuthStore } from '@/stores/auth';
import Cookies from 'js-cookie';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    AuthRoutes
  ]
});



router.beforeEach(async (to, from, next) => {
  const publicPages = ['/auth/login', '/auth/register']; // List of public pages
  const authRequired = !publicPages.includes(to.path);

  const token = Cookies.get('token'); // Fetch the token from cookies or retrieve it from local storage
  
  if (authRequired && !token) {
     return next('/auth/login'); // Redirect to login if no token is found
  }
  
  return next(); // Allow navigation otherwise
});

