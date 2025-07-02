import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Post, PostRow } from '@/types/post'
import { NUM_ROW_PER_POST } from '@/constants/constant'

const generateDummyPost = (id: number, isRecommend: boolean): Post => {
  const rows: PostRow[] = []

  for (let i = 0; i < NUM_ROW_PER_POST; i++) {
    rows.push({
      id: `row-${id}-${i}`,
      type: i % 3 === 0 ? 'image' : 'text',
      content:
        i % 3 === 0
          ? `https://picsum.photos/seed/${id * 100 + i}/400/300`
          : `這是第 ${i + 1} 行的內容，來自文章 #${id}`
    })
  }

  return {
    id: `post-${id}`,
    postTitle: `文章標題 #${id}`,
    rows,
    isRecommend,
    time: `2025-07-${(id % 30) + 1}`
  }
}

export const usePostStore = defineStore('postStore', () => {
  const postList = ref<Post[]>([])
  const currentPost = ref<Post | null>(null)

  const initDummyPosts = () => {
    const dummy: Post[] = []
    for (let i = 1; i <= 6; i++) {
      dummy.push(generateDummyPost(i, i % 2 === 0)) // 每兩篇為推薦
    }
    postList.value = dummy
  }

  const addPost = (newPost: Post) => {
    postList.value.unshift(newPost)
  }

  const setCurrentPostById = (postId: string) => {
    currentPost.value = postList.value.find(p => p.id === postId) || null
  }

  return {
    postList,
    currentPost,
    initDummyPosts,
    addPost,
    setCurrentPostById
  }
})
