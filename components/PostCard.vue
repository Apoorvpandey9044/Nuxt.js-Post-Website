<template>
  <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 cursor-pointer flex flex-col justify-between h-full">
    <div>
      <h2 class="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">{{ post.title }}</h2>
      <p class="text-gray-600 text-sm mb-4 leading-relaxed">{{ truncateBody(post.body, 120) }}</p>
    </div>
    <div class="mt-auto">
      <span class="text-xs text-blue-500 font-semibold group-hover:underline">Read more &rarr;</span>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

defineProps<{
  post: Post
}>()

const truncateBody = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
}
</script>

<style scoped>
/* Component-specific styles */
</style>