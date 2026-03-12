// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
  ],
  
  build: {
    // Use esbuild for faster builds
    minify: 'esbuild',
    esbuildOptions: {
      drop: ['console', 'debugger'],
    },
    
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@headlessui/react', 'lucide-react', 'flowbite-react'],
          'vendor-utils': ['axios'],
          'vendor-lightbox': ['yet-another-react-lightbox'],
        },
      },
    },
    
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: true,
    
    // General
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    target: 'es2020',
  },
  
  // Optimize CSS
  css: {
    devSourcemap: false,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },
});