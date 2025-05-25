<template>
  <div class="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div v-if="loading" class="text-center py-20">
        <p class="text-2xl text-gray-500">Loading article details...</p>
        <!-- You could add a spinner component here -->
      </div>
      <div v-else-if="error" class="text-center py-20 bg-red-50 p-8 rounded-lg shadow-md">
        <p class="text-2xl text-red-600">Oh no! We couldn't load this article: {{ error }}</p>
      </div>
      <article v-else-if="post" class="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 sm:p-10 lg:p-12">
        <NuxtLink to="/posts" class="inline-block mb-8 text-blue-600 hover:text-blue-800 transition-colors duration-300 group">
          <span class="group-hover:-translate-x-1 transition-transform duration-300 inline-block">&larr;</span> Back to All Posts
        </NuxtLink>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">{{ post.title }}</h1>
        <div class="flex items-center text-sm text-gray-500 mb-6 space-x-4">
          <span>User ID: <strong class="text-gray-700">{{ post.userId }}</strong></span>
          <span>Reactions: <strong class="text-gray-700">{{ post.reactions }}</strong></span>
        </div>
        <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
          {{ post.body }}
        </div>
        <div v-if="post.tags && post.tags.length > 0" class="mb-8">
          <span class="font-semibold text-gray-800 mr-2">Tags:</span>
          <span v-for="tag in post.tags" :key="tag" class="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full shadow-sm">
            #{{ tag }}
          </span>
        </div>
         <NuxtLink to="/posts" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
          <span class="mr-2">&larr;</span> Back to All Posts
        </NuxtLink>
      </article>
      <div v-else class="text-center py-20">
        <p class="text-2xl text-gray-500">Sorry, this post could not be found.</p>
    </div>
  </div> <!-- This closes the container mx-auto div -->
</div> <!-- This is the new closing tag for the main bg-gray-100 div -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '~/stores/postStore'

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

const route = useRoute()
const postStore = usePostStore()
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const postId = Number(route.params.id)

onMounted(async () => {
  loading.value = true
  error.value = null
  // Try to find post in store first
  const existingPost = postStore.posts.find(p => p.id === postId)
  if (existingPost) {
    post.value = existingPost
    loading.value = false
  } else {
    // If not in store, fetch individually (or re-fetch all if store is empty)
    if (postStore.posts.length === 0) {
      await postStore.fetchPosts() // Fetch all if store is empty
      const foundPost = postStore.posts.find(p => p.id === postId)
      if (foundPost) {
        post.value = foundPost
      } else {
        error.value = 'Post not found after fetching.'
      }
    } else {
      // If posts are in store but this one isn't, it might not exist
      // Or, implement a fetchPostById action in the store
      try {
        const response = await fetch(`https://dummyjson.com/posts/${postId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        post.value = await response.json()
      } catch (e: any) {
        error.value = e.message || `Failed to fetch post ${postId}`
        console.error(e)
      }
    }
  }
  loading.value = false
})
</script>

<style scoped>
/* Page-specific styles */
</style>