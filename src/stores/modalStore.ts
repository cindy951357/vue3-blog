import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const message = ref('')

  const openModal = (msg: string) => {
    message.value = msg
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
    message.value = ''
  }

  return {
    isOpen,
    message,
    openModal,
    closeModal
  }
})
