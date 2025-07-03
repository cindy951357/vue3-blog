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
        <li v-for="comment in latestComment.slice(0,5)" :key="comment.id">
          <RouterLink :to="`/post/${comment.postId}?commentId=${comment.id}`">
            {{ comment.content }} - {{ comment.time }}
            By {{ comment.author }}
          </RouterLink>
        </li>
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
import { useCommentStore } from '@/stores/commentStore';

const postStore = usePostStore();
const commentStore = useCommentStore();

const myLatestPosts = computed(() =>
  postStore.postList.filter(post => !post.isRecommend)
  .sort((a, b) =>  new Date(b.time).getTime() - new Date(a.time).getTime()));
const latestComment = computed(() =>
  commentStore.commentList.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()))
const formatDate = (iso: string) => {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

</script>
