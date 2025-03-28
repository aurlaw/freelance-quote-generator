<template>
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Quote Details</h1>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="!quote" class="text-center">Quote not found</div>
      <div v-else class="space-y-4">
        <p class="text-lg">
          Project Type: <span class="font-semibold">{{ quote.projectType }}</span>
        </p>
        <p class="text-lg">
          Scope: <span class="font-semibold">{{ quote.scope }}</span>
        </p>
        <p class="text-lg">
          Rush Job: <span class="font-semibold">{{ quote.isRush ? 'Yes' : 'No' }}</span>
        </p>
        <p class="text-lg">
          Estimated Cost: <span class="font-semibold">${{ quote.estimatedCost.toFixed(2) }}</span>
        </p>
        <p class="text-lg">
          Estimated Time: <span class="font-semibold">{{ quote.estimatedTime }}</span>
        </p>
        <router-link
          to="/"
          class="mt-6 block text-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </router-link>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Quote {
  id: number;
  projectType: string;
  scope: string;
  isRush: boolean;
  estimatedCost: number;
  estimatedTime: string;
}

const route = useRoute();
const quote = ref<Quote | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/quotes/${route.params.id}`);
    quote.value = response.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
  } finally {
    loading.value = false;
  }
});
</script>
