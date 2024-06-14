  import { defineNuxtRouteMiddleware, navigateTo } from '#app';
  import { useAuthStore } from '@/stores/auth';

  export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.isLoggedIn);
    if (!authStore.isLoggedIn && to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login');
    }
  });
