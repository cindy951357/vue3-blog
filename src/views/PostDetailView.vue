<template>
  <div class="max-w-4xl mx-auto p-4">
    <button @click="router.back()" class="text-rose-300 text-sm mb-4">← 返回</button>

    <div v-if="post" id="post-and-comment">
       <div id='post-detail' class="space-y-4">
        <h1 class="text-2xl font-bold">{{ post.postTitle }}</h1>
        <p class="text-sm text-gray-500">{{ post.time }}</p>

        <div class="space-y-4 mt-4">
          <div v-for="row in post.rows" :key="row.id" class="rounded-md">
            <div v-if="row.type === 'text'" class="bg-white p-4">
              {{ row.content }}
            </div>
            <div v-else class=" p-2">
              <img :src="row.content" class="rounded-md max-w-full" />
            </div>
          </div>
        </div>
      </div>
      <div id="comments-of-post" class="flex flex-col gap-2 mt-4 py-2 border-t-2 border-t-neutral-300">
        <div id="input-post">
          <textarea class="w-full h-80px border border-neutral-300 rounded p-2" placeholder="請輸入留言內容"
            v-model="inputComment"
          />
          <button class="w-full h-10 bg-neutral-300 hover:bg-rose-300 rounded-xl px-2" @click="addComment()">提交留言</button>
        </div>
        <div :id="`comment-${comment.id}`" v-for="comment in commentOfThisPost" :key="comment.id"
          class="border-t-2 border-t-neutral-300">
          <div>{{ comment.content }}</div>
          <div class="text-xs">By <span>{{ comment.author }}</span>
            <span>{{ comment.time }}</span>
          </div>
        </div>
      </div>
    </div> 
    <div v-else class="text-center text-neutral-600">
      找不到這篇文章。
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/stores/postStore';
import { useCommentStore } from '@/stores/commentStore';
import type Comment from '@/types/comment';
import { v4 as uuidv4 } from 'uuid';

const router = useRouter()
const route = useRoute()
const postStore = usePostStore()
const commentStore = useCommentStore();

const postId = route.params.id as string

onMounted(() => {
  postStore.setCurrentPostById(postId)

  setTimeout(() => {
    const targetId = route.query.commentId as string
    if (targetId) {
      const el = document.getElementById(`comment-${targetId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        el.classList.add('ring-2', 'ring-rose-300', 'rounded')
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-rose-300', 'rounded')
        }, 1600)
      }
    }
  }, 800) // 延遲 800ms 可確保圖片載入完
});

const inputComment = ref('');

const post = postStore.currentPost

const commentOfThisPost = computed(() => commentStore.commentList
  .filter((comment: Comment) =>
  comment.postId.toString() === post.id.toString()))



const addComment = () => {
  commentStore.addComment({
    id: uuidv4(),
    postId: post.id.toString(),
    author: 'Jane',
    content: inputComment.value,
    time: new Date().toLocaleDateString(),
  });
  inputComment.value = '';
}

</script>
