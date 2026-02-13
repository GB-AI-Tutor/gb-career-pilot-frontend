import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,           // Allows 'expect' and 'it' without importing
    environment: "jsdom",     // Simulates the browser
    setupFiles: "./src/setupTests.ts", // Loads jest-dom matchers
    css: true,               // Ensures Tailwind styles are processed in tests
  },
})
