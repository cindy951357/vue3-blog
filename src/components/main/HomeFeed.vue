<template>
  <div>
    <div class="flex space-x-4 mb-4 border-b pb-2">
      <RouterLink
        to="/recommend"
        class="hover:text-blue-600"
        :class="{ 'font-bold text-blue-600': $route.path === '/recommend' }"
      >推薦文章</RouterLink>
      <RouterLink
        to="/myposts"
        class="hover:text-blue-600"
        :class="{ 'font-bold text-blue-600': $route.path === '/myposts' }"
      >我的文章</RouterLink>
    </div>

    <RouterView />
  </div>
</template>
