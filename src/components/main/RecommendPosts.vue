<template>
  <div>
    <h2 class="font-bold text-lg mb-2">推薦文章（共 {{ recommendPosts.length }} 篇）</h2>
    <ul class="flex flex-col gap-y-4">
      <li
        v-for="post in recommendPosts"
        :key="post.id"
        class="border p-4 rounded-lg hover:bg-rose-100 focus:bg-rose-100 cursor-pointer"
        @click="goToPost(post.id)"
      >
        <h3 class="text-xl font-semibold">{{ post.postTitle }}</h3>
        <p class="text-sm text-gray-500">{{ post.time }}</p>
        <p class="text-gray-600 truncate">{{ getFirstTextRow(post) }}</p>
        <p><img :src="getFirstImageRow(post)"
            alt="封面圖"  class="w-40 h-28 object-cover rounded"
            />
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/postStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Post } from '@/types/post'

const router = useRouter()
const postStore = usePostStore()

const recommendPosts = computed(() =>
  postStore.postList.filter(post => post.isRecommend)
)

const goToPost = (id: string) => {
  postStore.setCurrentPostById(id)
  router.push(`/post/${id}`)
}

const getFirstTextRow = (post: Post) =>
  post.rows.find(r => r.type === 'text')?.content || '';

const getFirstImageRow = (post: Post) => {
    const findImg = post.rows.find(r => r.type === 'image')?.content || '';
    return findImg
}
</script>

