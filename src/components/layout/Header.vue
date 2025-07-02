<template>
  <header class="w-full bg-gray-100 py-4 px-6 flex flex-col gap-2 justify-start
    sm:flex-row sm:justify-between shadow">
    <!-- 左半：Logo + 搜尋 -->
    <div class="flex items-center gap-2">
      <div class="text-xl font-bold hover:cursor-pointer" @click="goToHomePage">MyBlog</div>
      <div class="relative border border-neutral-300 rounded-xxl">
        <input
          type="text"
          v-model="keyword"
          @keyup.enter="doSearch"
          placeholder="Search..."
          class="rounded-xxl px-3 py-1 text-sm pr-10"
        />
        <button
          @click="doSearch"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
    <!-- 右半：新增 + 設定 + 頭像 -->
    <div class="flex items-center sm:justify-start sm:items-start">
      <button class="text-neutral-600 hover:text-rose-300" @click="goToAdd"><AddIcon/></button>
      <button class="text-neutral-600 hover:text-rose-300"><setting-icon/></button>
      <button class="text-neutral-600 hover:text-rose-300"><profile-icon/></button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import AddIcon from '@/components/icons/AddIcon.vue';
import SettingIcon from '@/components/icons/SettingIcon.vue';
import ProfileIcon from '@/components/icons/ProfileIcon.vue';

const router = useRouter()

const keyword = ref('')

const doSearch = () => {
  if (keyword.value.trim() === '') return
  router.push(`/search?q=${encodeURIComponent(keyword.value.trim())}`)
}

const goToAdd = () => {
  router.push('/add')
}

const goToHomePage = () => {
  router.push('/');
}
</script>
