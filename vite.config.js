import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // default port, you can change
    open: true,        // automatically opens browser
  },
  resolve: {
    alias: {
      "@": "/src",     // now you can import like "@/components/..."
    },
  },
});