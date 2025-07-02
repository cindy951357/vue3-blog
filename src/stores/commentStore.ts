import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Comment } from '@/types/comment'

export const useCommentStore = defineStore('commentStore', () => {
  const commentList = ref<Comment[]>([])

  const initDummyComments = () => {
    commentList.value = [
      {
        id: 'c1',
        postId: 'post-1',
        author: '訪客小明',
        content: '這篇文章好棒！',
        time: '2025-07-01 10:30'
      },
      {
        id: 'c2',
        postId: 'post-2',
        author: '阿花',
        content: '圖片很漂亮，謝謝分享。',
        time: '2025-07-01 14:12'
      },
      {
        id: 'c3',
        postId: 'post-3',
        author: '訪客甲',
        content: '請問這段文字是什麼意思？',
        time: '2025-07-02 08:22'
      },
    ]
  }

  return {
    commentList,
    initDummyComments,
  }
})
