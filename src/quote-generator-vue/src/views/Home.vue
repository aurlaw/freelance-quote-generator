<template>
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Project Type</label>
        <select
          v-model="formData.projectType"
          class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Website">Website</option>
          <option value="Web App">Web App</option>
          <option value="Mobile Add-On">Mobile Add-On</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Scope</label>
        <select
          v-model="formData.scope"
          class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Small">Small (1-3 pages)</option>
          <option value="Medium">Medium (4-7 pages)</option>
          <option value="Large">Large (8+ pages)</option>
        </select>
      </div>
      <div>
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="formData.isRush"
            class="mr-2 text-blue-500 focus:ring-blue-500"
          />
          <span class="text-sm">Rush Job (+20% cost, faster delivery)</span>
        </label>
      </div>
      <button
        type="submit"
        class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Get Quote
      </button>
    </form>
    <div v-if="result" class="mt-6 p-4 bg-gray-700 rounded text-center">
      <p class="text-lg">
        Estimated Cost: <span class="font-semibold">${{ result.cost.toFixed(2) }}</span>
      </p>
      <p class="text-lg">
        Estimated Time: <span class="font-semibold">{{ result.time }}</span>
      </p>
      <router-link
        :to="`/quote/${result.id}`"
        class="mt-4 inline-block p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        View Quote Details
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const formData = ref({
  projectType: 'Website',
  scope: 'Small',
  isRush: false,
});

const result = ref<{ id?: number; cost: number; time: string } | null>(null);

const handleSubmit = async () => {
  try {
    const response = await axios.post('/api/quotes', formData.value);
    result.value = {
      id: response.data.id,
      cost: response.data.estimatedCost,
      time: response.data.estimatedTime,
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};
</script>
