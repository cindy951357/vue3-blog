<template>
  <div class="flex flex-col gap-4">
    <section>
      <h2 class="flex gap-1 font-bold mb-2"><SparkleIcon/> 我的最新文章</h2>
      <ul class="text-sm space-y-1">
        <li>文章 A - 7/2</li>
        <li>文章 B - 7/1</li>
      </ul>
    </section>
    <section>
      <h2 class="flex gap-1 font-bold mb-2"><CommentIcon/> 訪客留言</h2>
      <ul class="text-sm space-y-1">
        <li><strong>訪客1：</strong>留言內容 (7/2 12:00)</li>
        <li><strong>訪客2：</strong>另一則留言 (7/1 18:33)</li>
      </ul>
    </section>
  </div>
</template>
<script setup lang="ts">
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SparkleIcon from '@/components/icons/SparkleIcon.vue';
</script>
