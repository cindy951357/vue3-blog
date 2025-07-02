<template>
  <main class="flex flex-1 p-4 gap-4">
    <div class="w-2/3">
       <RouterView />
    </div>
    <div class="w-1/3">
      <RightPanel />
    </div>
  </main>
</template>

<script setup lang="ts">
import RightPanel from '@/components/main/RightPanel.vue'
</script>
