<template>
  <div class="container mt-5 page-background">
    <h1 class="mb-4 page-title">Add New Object</h1>
    <form @submit.prevent="addObject" class="needs-validation" novalidate>
      <div class="mb-3">
        <label class="form-label d-block">Status</label>
        <div class="btn-group d-flex justify-content-center" role="group" aria-label="Status">
          <button type="button" class="btn btn-outline-custom mx-2 rounded-start" :class="{ active: form.status === 'found' }" @click="form.status = 'found'">Found</button>
          <button type="button" class="btn btn-outline-custom mx-2 rounded-end" :class="{ active: form.status === 'lost' }" @click="form.status = 'lost'">Lost</button>
        </div>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="form.name" type="text" id="name" required class="form-control" />
        <div class="invalid-feedback">Name is required.</div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="form.description" id="description" required class="form-control"></textarea>
        <div class="invalid-feedback">Description is required.</div>
      </div>
      <div class="mb-3">
        <label for="signaledDate" class="form-label">Signaled Date</label>
        <input v-model="form.signaledDate" type="date" id="signaledDate" required class="form-control" />
        <div class="invalid-feedback">Signaled date is required.</div>
      </div>
      <button type="submit" class="btn btn-custom btn-block">Submit</button>
    </form>
    <div v-if="message" class="alert alert-info mt-3">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const form = ref({
  name: '',
  description: '',
  signaledDate: '',
  status: 'found', // 'found' is selected by default
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
        status: 'found', // Reset to 'found' after successful submission
        // logged in user id can be added here as owner if found or signaled by if lost
      };
    }
  } catch (error) {
    message.value = 'Failed to add object.';
  }
};

onMounted(() => {
  const formElement = document.querySelector('form');
  formElement.addEventListener('submit', (event) => {
    if (!formElement.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    formElement.classList.add('was-validated');
  });
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

.btn-group .btn {
  border-radius: 30px !important;
}

.btn.active {
  background-color: #68dbc9; 
  color: #203145;
}

.btn-outline-custom {
  color: #203145; 
  border-color: #eff2f7;
  background-color: #eff2f7;
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
.btn-group {
  gap: 10px; 
}


</style>
