<script lang="ts">
    import axios from 'axios';
    import { goto } from '$app/navigation';
  
    let formData = {
      projectType: 'Website',
      scope: 'Small',
      isRush: false,
    };
  
    let result: { id?: number; cost: number; time: string } | null = null;
  
    async function handleSubmit() {
      try {
        const response = await axios.post('/api/quotes', formData);
        result = {
          id: response.data.id,
          cost: response.data.estimatedCost,
          time: response.data.estimatedTime,
        };
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    }
  </script>
  
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <label for="projectType" class="block text-sm font-medium mb-1">Project Type</label>
          <select
            id="projectType"
            bind:value={formData.projectType}
            class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Website">Website</option>
            <option value="Web App">Web App</option>
            <option value="Mobile Add-On">Mobile Add-On</option>
          </select>
        </div>
        <div>
          <label for="scope"  class="block text-sm font-medium mb-1">Scope</label>
          <select
            id="scope"
            bind:value={formData.scope}
            class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Small">Small (1-3 pages)</option>
            <option value="Medium">Medium (4-7 pages)</option>
            <option value="Large">Large (8+ pages)</option>
          </select>
        </div>
        <div>
          <label class="flex items-center" for="isRush">
            <input
              id="isRush"
              type="checkbox"
              bind:checked={formData.isRush}
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
      {#if result}
        <div class="mt-6 p-4 bg-gray-700 rounded text-center">
          <p class="text-lg">
            Estimated Cost: <span class="font-semibold">${result.cost.toFixed(2)}</span>
          </p>
          <p class="text-lg">
            Estimated Time: <span class="font-semibold">{result.time}</span>
          </p>
          <a
            href={`/quote/${result.id}`}
            class="mt-4 inline-block p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            View Quote Details
          </a>
        </div>
      {/if}
    </div>
