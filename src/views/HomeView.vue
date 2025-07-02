<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostStore } from '@/stores/postStore'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import Footer from '@/components/layout/Footer.vue'

const postStore = usePostStore()

onMounted(() => {
  if (postStore.postList.length === 0) {
    postStore.initDummyPosts()
  }
})
</script>
