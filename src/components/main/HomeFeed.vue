<script setup lang="ts">
import RightPanel from './RightPanel.vue';

</script>

<template>
  <div id="home-left-right-container" class="flex gap-8">
    <div id="home-left" class="w-3/4">
      <div class="flex gap-x-4 mb-4 border-b pb-2">
        <RouterLink
          to="/recommend/posts"
          class="hover:text-rose-300"
          :class="{ 'font-bold text-neutral-300': $route.path.startsWith('/recommend/posts') }"
        >推薦文章</RouterLink>

        <RouterLink
          to="/myposts/posts"
          class="hover:text-rose-300"
          :class="{ 'font-bold text-neutral-300': $route.path.startsWith('/myposts/posts') }"
        >我的文章</RouterLink>
      </div>

      <RouterView /> <!-- 顯示 RecommendPosts 或 MyPosts -->
    </div>
    <div id="home-right" class="w-1/4">
      <RightPanel/>
    </div>
  </div>
</template>
