import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'http://localhost:3000/',
      '/signup': 'http://localhost:3000/',
      '/sendMessage': 'http://localhost:3000/',
      '/getLatestUserData': 'http://localhost:3000/',
      '/acceptFriendRequest': 'http://localhost:3000/',
      '/rejectFriendRequest': 'http://localhost:3000/',
    }
  },
})