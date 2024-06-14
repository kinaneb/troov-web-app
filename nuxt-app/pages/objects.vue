<template>
    <div>
      <h1>List of Signaled Objects</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <ul v-else class="object-list">
        <li v-for="object in objects" :key="object._id">
          <h2>{{ object.name }}</h2>
          <p>{{ object.description }}</p>
          <p><strong>Status:</strong> {{ object.status }}</p>
          <p><strong>Signaled Date:</strong> {{ new Date(object.signaledDate).toLocaleDateString() }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useNuxtApp } from '#app';
  
  interface SignaledObject {
    _id: string;
    name: string;
    description: string;
    signaledDate: string;
    status: string;
  }
  
  const objects = ref<SignaledObject[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  
  const { $axios } = useNuxtApp();
  
  onMounted(async () => {
    try {
      const response = await $axios.get('/api/objects');
      objects.value = response.data;
    } catch (err) {
      error.value = 'Failed to load objects';
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  .loading {
    font-size: 1.5em;
    text-align: center;
  }
  .error {
    color: red;
    font-size: 1.2em;
    text-align: center;
  }
  .object-list {
    list-style-type: none;
    padding: 0;
  }
  .object-list li {
    border: 1px solid #ccc;
    padding: 1em;
    margin: 1em 0;
  }
  </style>
  