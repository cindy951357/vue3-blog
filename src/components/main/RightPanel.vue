<template>
  <div class="flex flex-col gap-4">
    <section>
      <h2 class="flex gap-1 font-bold mb-2"><SparkleIcon/> 我的最新文章</h2>
        <ul class="text-sm space-y-1">
          <li v-for="post in myLatestPosts.slice(0, 5)" :key="post.id">
            <RouterLink
              :to="`/post/${post.id}`"
              class="hover:underline hover:text-rose-300"
            >
              {{ post.postTitle }} - {{ post.time }}
            </RouterLink>
          </li>
        </ul>
    </section>
    <section>
      <h2 class="flex gap-1 font-bold mb-2"><CommentIcon/> 訪客留言</h2>
      <ul class="text-sm space-y-1">
        <li><strong>訪客1：</strong>留言內容 (7/2 12:00)</li>
        <li><strong>訪客2：</strong>另一則留言 (7/1 18:33)</li>
      </ul>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SparkleIcon from '@/components/icons/SparkleIcon.vue';
import { usePostStore } from '@/stores/postStore';
import { RouterLink } from 'vue-router';

const postStore = usePostStore();

const myLatestPosts = computed(() =>
  postStore.postList.filter(post => !post.isRecommend)
  .sort((a, b) => b.time.localeCompare(a.time))
);
const formatDate = (iso: string) => {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

</script>
