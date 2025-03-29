<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
    <header class="flex flex-col items-center mb-8">
      <h1 class="text-3xl font-bold mb-6 text-center">Freelance Quote Generator</h1>
      <img src="/logo.png" alt="Logo" width="96" height="96" class="mb-4" />
      <p class="text-lg mb-4 text-center">Generate cost and time estimates for freelance projects</p>
    </header>
    <router-view></router-view> <!-- Add this to render routed components -->
    <footer class="mt-auto text-center text-sm text-gray-400">
      <p>&copy; {{new Date().getFullYear()}} Freelance Quote Generator - Vue 3 version</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Empty setup - move form logic to a Home component
</script>
