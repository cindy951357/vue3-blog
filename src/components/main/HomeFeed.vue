<template>
  <div>
    <div class="flex space-x-4 mb-4 border-b pb-2">
      <RouterLink
        to="/recommend/posts"
        class="hover:text-blue-600"
        :class="{ 'font-bold text-blue-600': $route.path.startsWith('/recommend/posts') }"
      >推薦文章</RouterLink>

      <RouterLink
        to="/myposts/posts"
        class="hover:text-blue-600"
        :class="{ 'font-bold text-blue-600': $route.path.startsWith('/myposts/posts') }"
      >我的文章</RouterLink>
    </div>

    <RouterView /> <!-- 顯示 RecommendPosts 或 MyPosts -->
  </div>
</template>
