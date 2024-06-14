<template>
    <div class="container">
      <h1>Add New Object</h1>
      <form @submit.prevent="addObject">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="form.description" id="description" required class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="signaledDate">Signaled Date</label>
          <input v-model="form.signaledDate" type="date" id="signaledDate" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="form.status" id="status" required class="form-control">
            <option value="found">Found</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div v-if="message" class="alert alert-info mt-3">{{ message }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useNuxtApp } from '#app';
  
  const form = ref({
    name: '',
    description: '',
    signaledDate: '',
    status: 'found',
    // add the logged user id as the owner of the object if lost and as signaledBy if found
  });
  
  const message = ref('');
  const { $axios } = useNuxtApp();
  
  const addObject = async () => {
    try {
      const response = await $axios.post('/api/objects', form.value);
      if (response.status === 201) {
        message.value = 'Object added successfully!';
        form.value = {
          name: '',
          description: '',
          signaledDate: '',
          status: 'found',
        };
      }
    } catch (error) {
      message.value = 'Failed to add object.';
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  