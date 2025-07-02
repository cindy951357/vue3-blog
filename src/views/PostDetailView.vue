<template>
  <div class="max-w-4xl mx-auto p-4">
    <button @click="router.back()" class="text-blue-600 text-sm mb-4">← 返回</button>

    <div v-if="post" class="space-y-4">
      <h1 class="text-2xl font-bold">{{ post.postTitle }}</h1>
      <p class="text-sm text-gray-500">{{ post.time }}</p>

      <div class="space-y-4 mt-4">
        <div v-for="row in post.rows" :key="row.id" class="rounded-md">
          <div v-if="row.type === 'text'" class="bg-white p-4 border border-gray-200">
            {{ row.content }}
          </div>
          <div v-else class="border border-gray-200 p-2">
            <img :src="row.content" class="rounded-md max-w-full" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-400">
      找不到這篇文章。
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/postStore'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const postStore = usePostStore()

const postId = route.params.id as string

onMounted(() => {
  postStore.setCurrentPostById(postId)
})

const post = postStore.currentPost
</script>
