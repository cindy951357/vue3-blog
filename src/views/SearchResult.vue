    <template>
  <div class="p-4 space-y-6">
    <h2 class="text-xl font-bold">搜尋結果：「{{ keyword }}」</h2>

    <div>
      <h3 class="font-semibold mb-2">文章</h3>
      <ul v-if="matchedPosts.length > 0" class="space-y-2">
        <li v-for="post in matchedPosts" :key="post.id" class="border p-2 rounded">
          <strong>{{ post.postTitle }}</strong>
          <p class="text-sm text-gray-600">{{ post.time }}</p>
        </li>
      </ul>
      <p v-else class="text-sm text-gray-500">沒有找到相關文章。</p>
    </div>

    <div>
      <h3 class="font-semibold mb-2">留言</h3>
      <ul v-if="matchedComments.length > 0" class="space-y-2">
        <li
          v-for="comment in matchedComments"
          :key="comment.id"
          class="border p-2 rounded"
        >
          <p>{{ comment.content }}</p>
          <p class="text-xs text-gray-500">by {{ comment.author }} - {{ comment.time }}</p>
        </li>
      </ul>
      <p v-else class="text-sm text-gray-500">沒有找到相關留言。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { usePostStore } from '@/stores/postStore'
import { useCommentStore } from '@/stores/commentStore'

const route = useRoute()
const keyword = computed(() => route.query.q?.toString() ?? '')

const postStore = usePostStore()
const commentStore = useCommentStore()

const matchedPosts = computed(() =>
  postStore.postList.filter(post =>
    post.postTitle.includes(keyword.value) ||
    post.rows.some(r => r.type === 'text' && r.content.includes(keyword.value))
  )
)

const matchedComments = computed(() =>
  commentStore.commentList.filter(comment =>
    comment.content.includes(keyword.value) || comment.author.includes(keyword.value)
  )
)
</script>
