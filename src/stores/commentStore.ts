import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Comment } from '@/types/comment'
import { MOCK_COMMENTS } from '@/constants/mock'

export const useCommentStore = defineStore('commentStore', () => {
  const commentList = ref<Comment[]>([])

  const initDummyComments = () => {
    commentList.value = MOCK_COMMENTS;
  }

  const addComment = (newComment: Comment) => {
    commentList.value.unshift(newComment);
  }

  return {
    commentList,
    initDummyComments,
    addComment,
  }
})
