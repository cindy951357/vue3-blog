<template>
  <div class="max-w-4xl mx-auto p-4 space-y-4">
    <h1 class="text-xl font-bold">新增文章</h1>

    <input
      type="text"
      v-model="title"
      placeholder="請輸入標題"
      class="border p-2 w-full rounded"
    />
    <span v-if="title.trim() === ''" class="text-red-500 text-sm">⚠️ 標題必填</span>

    <div class="space-y-4">
      <div
        v-for="(row, index) in rows"
        :key="row.id"
        class="border p-2 rounded relative"
      >
        <div v-if="row.type === 'text'">
          <textarea
            v-model="row.content"
            class="w-full border rounded p-2"
            placeholder="輸入文字內容"
          />
        </div>
        <div v-else>
          <input type="file" accept="image/*" @change="onImageChange($event, row)" />
          <div v-if="row.content" class="mt-2">
            <img :src="row.content" class="max-w-xs rounded" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        class="text-xl text-green-600"
        @click="addRow"
        :disabled="rows.length >= NUM_ROW_PER_POST"
      >➕ 新增一列</button>
    </div>

    <p v-if="rows.length >= NUM_ROW_PER_POST" class="text-red-600 text-sm text-center">
      ❗ 最多只能新增 {{ NUM_ROW_PER_POST }} 列
    </p>

    <div class="text-center mt-6">
      <button
        class="bg-blue-600 text-white px-6 py-2 rounded-xl"
        @click="savePost"
      >儲存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '@/stores/postStore'
import { useRouter } from 'vue-router'
import { NUM_ROW_PER_POST } from '@/constants/constant'
import type { PostRow } from '@/types/post'
import { v4 as uuidv4 } from 'uuid'

const postStore = usePostStore()
const router = useRouter()

const title = ref('')
const rows = ref<PostRow[]>([])

const addRow = () => {
  if (rows.value.length >= NUM_ROW_PER_POST) return

  const isEven = rows.value.length % 2 === 0
  rows.value.push({
    id: uuidv4(),
    type: isEven ? 'text' : 'image',
    content: ''
  })
}

const onImageChange = (event: Event, row: PostRow) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const blobUrl = URL.createObjectURL(file)
  row.content = blobUrl
}

const savePost = () => {
  if (title.value.trim() === '') return

  postStore.addPost({
    id: uuidv4(),
    postTitle: title.value,
    time: new Date().toLocaleString(),
    isRecommend: false,
    rows: rows.value.map(r => ({ ...r }))
  })

  router.push('/myposts')
}
</script>
