<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Modal from '@/components/common/Modal.vue'
import { useModalStore } from '@/stores/modalStore'

const modal = useModalStore()

</script>

<template>
  <RouterView />
  <Modal/>
</template>

<style scoped>

</style>
