<template>
  <div class="max-w-4xl h-full mx-auto p-4 flex flex-col justify-between">
    <div class="top-half">
      <h1 class="text-xl font-bold">新增文章</h1>

        <input
          type="text"
          v-model="title"
          placeholder="請輸入標題"
          class="border p-2 w-full rounded"
        />
        <span v-if="title.trim() === ''" class="text-red-500 text-sm">⚠️ 標題必填</span>

        <div class="w-full space-y-4">
          <div
            v-for="(row, index) in rows"
            :key="row.id"
            class="w-full border p-2 rounded flex group bg-white"
          >
            <!-- 內容顯示 -->
            <div v-if="row.type === 'text'" class="w-9/10">
              <textarea
                v-model="row.content"
                class="w-full border rounded p-2"
                placeholder="輸入文字內容"
              />
            </div>
            <div v-else class="w-9/10">
              <input type="file" accept="image/*" @change="onImageChange($event, row)" />
              <div v-if="row.content" class="mt-2">
                <img :src="row.content" class="max-w-xs rounded" />
              </div>
            </div>
            <!-- 刪除按鈕 -->
            <button
              class="w-1/10 text-red-500 hover:scale-125 flex justify-center items-center"
              @click="removeRow(index)"
            >
              <delete-icon/>
            </button>
          </div>
        </div>

        <!-- 底部新增列按鈕與 tooltip -->
        <div class="flex justify-center mt-4 relative group">
          <button
            class="text-2xl text-neutral-600 hover:scale-125 transition-transform"
          >
            <add-icon/>
          </button>

          <div
            class="absolute top-8 bg-white border p-2 rounded shadow-md flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <button @click="addRow('text')" class="hover:bg-gray-100 p-2 rounded">
              🅣
            </button>
            <button @click="addRow('image')" class="hover:bg-gray-100 p-2 rounded">
              🖼️
            </button>
          </div>
        </div>

        <p v-if="rows.length >= NUM_ROW_PER_POST" class="text-red-600 text-sm text-center">
          ❗ 最多只能新增 {{ NUM_ROW_PER_POST }} 列
        </p>
    </div>   
    <div class="bottom-half text-center mt-6">
      <button
        class="bg-gray-300 hover:bg-purple-300 text-white px-6 py-2 rounded-xl"
        @click="savePost"
      >儲存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePostStore } from '@/stores/postStore';
import { useModalStore } from '@/stores/modalStore';
import { useRouter } from 'vue-router';
import { NUM_ROW_PER_POST } from '@/constants/constant';
import type { PostRow } from '@/types/post';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@/components/icons/AddIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';

const postStore = usePostStore()
const modal = useModalStore()
const router = useRouter()

const title = ref('')
const rows = ref<PostRow[]>([])

const addRow = (type: 'text' | 'image') => {
  if (rows.value.length >= NUM_ROW_PER_POST) {
    modal.openModal(`最多只能新增 ${NUM_ROW_PER_POST} 列內容`)
    return
  }
  rows.value.push({
    id: uuidv4(),
    type,
    content: ''
  })
}

const removeRow = (index: number) => {
  rows.value.splice(index, 1)
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
    rows: rows.value.map(r => ({ ...r })),
    themeTag: ''
  })

  router.push('/myposts')
}
</script>
