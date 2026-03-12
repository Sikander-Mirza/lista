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
    // Use esbuild instead of terser (faster, built-in)
    minify: 'esbuild',
    
    // esbuild options
    esbuildOptions: {
      drop: ['console', 'debugger'], // Remove console.log and debugger
    },
    
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
    
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },
});