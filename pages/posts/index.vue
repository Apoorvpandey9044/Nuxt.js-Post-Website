<template>
  <div class="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <h1 class="text-4xl font-extrabold mb-10 text-center text-gray-800">Latest Blog Posts</h1>
      <div v-if="postStore.loading" class="text-center py-10">
        <p class="text-xl text-gray-500">Fetching fresh articles...</p>
        <!-- You could add a spinner component here -->
      </div>
      <div v-else-if="postStore.error" class="text-center py-10 bg-red-50 p-6 rounded-lg">
        <p class="text-xl text-red-600">Oops! Something went wrong: {{ postStore.error }}</p>
      </div>
      <div v-else-if="postStore.posts.length === 0" class="text-center py-10">
        <p class="text-xl text-gray-500">No articles to show right now. Check back later!</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <NuxtLink v-for="post in postStore.posts" :key="post.id" :to="`/posts/${post.id}`" class="group block">
          <PostCard :post="post" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostStore } from '~/stores/postStore'
import PostCard from '~/components/PostCard.vue' // Ensure PostCard is imported

const postStore = usePostStore()

onMounted(() => {
  if (postStore.posts.length === 0) { // Fetch only if posts aren't already loaded
    postStore.fetchPosts()
  }
})
</script>

<style scoped>
/* Page-specific styles can go here if needed */
</style>