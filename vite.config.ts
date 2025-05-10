// vite.config.ts
import path from "path" // <-- Import the 'path' module
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: { // <-- Add the 'resolve' section
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- Map '@' to the 'src' directory
    },
  },
})