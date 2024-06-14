<template>
  <div class="container mt-5 page-background">
    <h1 class="mb-4 page-title">List of Objects</h1>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="objects.length === 0" class="alert alert-info text-center">
        No objects found.
      </div>
      <div v-else class="list-group">
        <div v-for="object in objects" :key="object._id" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ object.name }}</h5>
            <small>{{ new Date(object.signaledDate).toLocaleDateString() }}</small>
          </div>
          <p class="mb-1">{{ object.description }}</p>
          <small class="text-muted">Status: {{ object.status }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const objects = ref([]);
const loading = ref(true);
const { $axios } = useNuxtApp();

const fetchObjects = async () => {
  try {
    const response = await $axios.get('/api/objects');
    objects.value = response.data;
  } catch (error) {
    console.error('Failed to fetch objects:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchObjects();
});
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

.list-group-item {
  background-color: #eff2f7; 
  border-color: #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
}

.list-group-item h5 {
  color: #203145; 
}

.list-group-item p {
  color: #555;
}

.list-group-item small {
  color: #888;
}

.spinner-border {
  color: #68dbc9; 
}

.alert-info {
  background-color: #68dbc9; 
  border-color: #68dbc9;
  color: #203145; 
}
</style>
