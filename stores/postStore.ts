import { defineStore } from 'pinia'

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPosts() {
      this.loading = true
      this.error = null
      try {
        // Using dummyjson.com for mock posts
        const response = await fetch('https://dummyjson.com/posts?limit=10')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.posts = data.posts
      } catch (e: any) {
        this.error = e.message || 'Failed to fetch posts'
        console.error(e)
      } finally {
        this.loading = false
      }
    },
  },
})