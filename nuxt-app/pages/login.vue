<template>
  <div class="container mt-5 page-background">
    <h1 class="mb-4 page-title">Login</h1>
    <form @submit.prevent="login" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="username" type="text" id="username" required class="form-control" />
        <div class="invalid-feedback">Username is required.</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="password" type="password" id="password" required class="form-control" />
        <div class="invalid-feedback">Password is required.</div>
      </div>
      <button type="submit" class="btn btn-custom btn-block">Login</button>
      <button @click="navigateToRegister" type="button" class="btn btn-outline-custom btn-block mt-3">Register</button>
    </form>
    <div v-if="message" class="alert alert-info mt-3">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { useAuthStore } from '@/stores/auth';

const username = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();
const { $axios } = useNuxtApp();

const authStore = useAuthStore();


const login = async () => {
  try {
    const response = await $axios.post('/login', { username: username.value, password: password.value });
    await authStore.login();
    router.push('/');
  } catch (error) {
    message.value = 'Failed to login. Please check your credentials.';
  }
};

const navigateToRegister = () => {
  router.push('/register');
};
</script>

  <style scoped>
  .page-background {
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .page-title {
    color: #333;
    text-align: center;
    font-weight: bold;
  }
  
  .form-label {
    color: #555;
    font-weight: bold;
  }
  
  .form-control {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    font-size: 16px;
  }
  
  .btn-custom {
    background-color: #68dbc9; 
    border-color: #68dbc9;
  }
  
  .btn-block {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
  }
  
  .alert {
    text-align: center;
  }
  
  .invalid-feedback {
    display: block;
  }
  </style>
  