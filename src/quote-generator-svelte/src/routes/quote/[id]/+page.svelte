<script lang="ts">
  import axios from 'axios';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let quote: {
    id: number;
    projectType: string;
    scope: string;
    isRush: boolean;
    estimatedCost: number;
    estimatedTime: string;
  } | null = null;
  let loading = true;

  // Get id from $page.params reactively
  $: id = $page.params.id;

  // Fetch quote when component mounts or id changes
  async function fetchQuote() {
    if (!id) {
      loading = false;
      return; // Avoid fetching if id is undefined
    }
    try {
      const response = await axios.get(`/api/quotes/${id}`);
      quote = response.data;
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchQuote(); // Initial fetch
  });

  // Reactively refetch if id changes (e.g., navigating between quotes)
  $: if (id) fetchQuote();
</script>

  <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Quote Details</h1>
    {#if loading}
      <div class="text-center">Loading...</div>
    {:else if !quote}
      <div class="text-center">Quote not found</div>
    {:else}
      <div class="space-y-4">
        <p class="text-lg">
          Project Type: <span class="font-semibold">{quote.projectType}</span>
        </p>
        <p class="text-lg">
          Scope: <span class="font-semibold">{quote.scope}</span>
        </p>
        <p class="text-lg">
          Rush Job: <span class="font-semibold">{quote.isRush ? 'Yes' : 'No'}</span>
        </p>
        <p class="text-lg">
          Estimated Cost: <span class="font-semibold">${quote.estimatedCost.toFixed(2)}</span>
        </p>
        <p class="text-lg">
          Estimated Time: <span class="font-semibold">{quote.estimatedTime}</span>
        </p>
        <a
          href="/"
          class="mt-6 block text-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    {/if}
  </div>
