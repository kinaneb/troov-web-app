import { defineNuxtPlugin } from '#app';
import axios from 'axios';

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  });

  return {
    provide: {
      axios: instance,
    },
  };
});
