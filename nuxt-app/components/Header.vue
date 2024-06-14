<template>
  <header class="header">
    <div class="logo">Your Logo</div>
    <nav>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => authStore.isLoggedIn);

const logout = () => {
  authStore.logout();
  router.push('/login');
};

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #68dbc9; 
  color: #203145; 
}

.nav {
  display: flex;
}

.nav > * {
  margin-left: 10px;
  text-decoration: none;
  color: inherit;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
}
</style>
