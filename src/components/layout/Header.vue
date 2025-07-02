<template>
  <header class="bg-gray-100 py-4 px-6 flex justify-between items-center shadow">
    <!-- 左半：Logo + 搜尋 -->
    <div class="flex items-center space-x-4">
      <div class="text-xl font-bold">MyBlog</div>
      <input
        type="text"
        placeholder="Search..."
        class="rounded-xxl border px-3 py-1 text-sm"
      />
    </div>
    <!-- 右半：新增 + 設定 + 頭像 -->
    <div class="flex items-center space-x-4">
      <button class="text-blue-600" @click="goToAdd">➕</button>
      <button class="text-gray-600">⚙️</button>
      <button class="text-gray-600">👤</button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goToAdd = () => {
  router.push('/add')
}
</script>
