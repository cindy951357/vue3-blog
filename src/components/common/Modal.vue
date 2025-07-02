<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-xl">
      <p class="text-lg mb-4 text-gray-800">{{ message }}</p>
      <button
        class="bg-blue-600 text-white px-6 py-2 rounded-xl"
        @click="closeModal"
      >知道了</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'

const modal = useModalStore()
const { isOpen, message, closeModal } = modal
</script>
